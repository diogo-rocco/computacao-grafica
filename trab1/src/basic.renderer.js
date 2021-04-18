(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory(global.BasicRenderer = {}));
}(this, (function (exports) { 'use strict';


        /* ------------------------------------------------------------ */

    function triangulate(primitive, n_vertices){
        var vertices = []
        var c_x = primitive.center[0];
        var c_y = primitive.center[1];
        var raio = primitive.radius;


        var step_size = 2*Math.PI/n_vertices;
        for(var i=0; i<=2*Math.PI; i += step_size){
            var p_x = Math.round(c_x + raio*Math.cos(i));
            var p_y = Math.round(c_y + raio*Math.sin(i));
            vertices.push([p_x, p_y])
        }
        if(vertices.length>n_vertices) vertices.length=n_vertices;
        primitive.vertices = vertices;
    }
    
    function inside(  x, y, primitive  ) {
        var L = [];
        var vertices = primitive.vertices;
        
        for (var i = 0; i < vertices.length; i++ ) {
            var n = [];
            
            if(i != vertices.length - 1) {
                n[0] = - ( vertices[i + 1][1] - vertices[i][1] );
                n[1] =  vertices[i + 1][0] - vertices[i][0];
            }
            else {
                n[0] = - ( vertices[0][1] - vertices[i][1] );
                n[1] =  vertices[0][0] - vertices[i][0];
            }
            
            var vector_to_point = [];
            vector_to_point[0] = x - vertices[i][0];
            vector_to_point[1] = y - vertices[i][1];
            
            L[i] = vector_to_point[0] * n[0] +  vector_to_point[1] * n[1];
        }
        
        for(var i = 0; i<L.length; i++) {
            if(L[i]*L[0] < 0) return false;
        }
        return true;
    }
    
    function insideWindingNumber(  x, y, primitive  ) {
        var L = [];
        var vertices = primitive.vertices;
        var winding_number = 0;
        
        for (var i = 0; i < vertices.length; i++ ) {
            var n = [];
            
            if(i != vertices.length - 1) {
                n[0] = - ( vertices[i + 1][1] - vertices[i][1] );
                n[1] =  vertices[i + 1][0] - vertices[i][0];
            }
            else {
                n[0] = - ( vertices[0][1] - vertices[i][1] );
                n[1] =  vertices[0][0] - vertices[i][0];
            }
            
            var vector_to_point = [];
            vector_to_point[0] = x - vertices[i][0];
            vector_to_point[1] = y - vertices[i][1];
            
            L[i] = vector_to_point[0] * n[0] +  vector_to_point[1] * n[1];
        }
        
        for(var i = 0; i<L.length; i++) {
            var vertice_1 = vertices[i];
            var vertice_2;
            if(i != vertices.length - 1) vertice_2 = vertices[i+1];
            else vertice_2 = vertices[0];
            var min_x = vertice_1[0] < vertice_2[0] ? vertice_1[0] : vertice_2[0];
            var max_x = vertice_1[0] >= vertice_2[0] ? vertice_1[0] : vertice_2[0];

            if(x < max_x && x > min_x){
                if(L[i]< 0) winding_number--;
                else winding_number++;
            }

        }
        if(winding_number==0) return false;
        return true;
    }

    function transpose(matrix){
        var transposed_matrix = [[]];
        for(var i = 0; i<matrix.length; i++)
            for(var j=0; j<matrix[i].length; j++){
                if(transposed_matrix.length<matrix[i].length) transposed_matrix[j] = []
                transposed_matrix[j][i] = matrix[i][j]
            }
    
        return transposed_matrix;
    }

    function multiplyMatrices(matrix_1, matrix_2) {
        var result = [];
        for (var i = 0; i < matrix_1.length; i++) {
            result[i] = [];
            for (var j = 0; j < matrix_2[0].length; j++) {
                var sum = 0;
                for (var k = 0; k < matrix_1[0].length; k++) {
                    sum += matrix_1[i][k] * matrix_2[k][j];
                }
                result[i][j] = Math.round(sum);
            }
        }
        return transpose(result);
    }

    

    function applyTransformation(primitive){
        var vertices = [];
        var novos_vertices = [];
        var transformation = primitive.xform;
        
        for(var i=0; i<primitive.vertices.length; i++){
            vertices.push([primitive.vertices[i][0], primitive.vertices[i][1], 1]);
        }
        
        novos_vertices = multiplyMatrices(transformation, transpose(vertices))

        for(var i=0; i<novos_vertices.length; i++){
            novos_vertices[i] = [novos_vertices[i][0], novos_vertices[i][1]];
        }

        return novos_vertices;
    }
    

    function getBoundingBox(primitive){
        var vertices = primitive.vertices;
        var min_x = vertices[0][0];
        var max_x = vertices[0][0];
        var min_y = vertices[0][1];
        var max_y = vertices[0][1];

        for(var i=1; i<vertices.length; i++){
            if(vertices[i][0] < min_x) min_x = vertices[i][0];
            if(vertices[i][0] > max_x) max_x = vertices[i][0];
            if(vertices[i][1] < min_y) min_y = vertices[i][1];
            if(vertices[i][1] > max_y) max_y = vertices[i][1];
        }

        return {min_x, max_x, min_y, max_y,};
    }


    function Screen( width, height, scene ) {
        this.width = width;
        this.height = height;
        this.scene = this.preprocess(scene);   
        this.createImage(); 
    }

    Object.assign( Screen.prototype, {

            preprocess: function(scene) {
                // Possible preprocessing with scene primitives, for now we don't change anything
                // You may define bounding boxes, convert shapes, etc
                
                var preprop_scene = [];

                for( var primitive of scene ) {  
                    // do some processing
                    // for now, only copies each primitive to a new list

                    preprop_scene.push( primitive );
                    
                }

                
                return preprop_scene;
            },

            createImage: function() {
                this.image = nj.ones([this.height, this.width, 3]).multiply(255);
            },

            rasterize: function() {
                var color;
         
                // In this loop, the image attribute must be updated after the rasterization procedure.
                for( var primitive of this.scene ) {

                    // Loop through all pixels
                    // Use bounding boxes in order to speed up this loop
                    
                    if(primitive.shape == "circle") triangulate(primitive, 100);
                    if(primitive.hasOwnProperty("xform")) primitive.vertices = applyTransformation(primitive);
                    var bounding_box;

                    bounding_box = getBoundingBox(primitive);

                    for (var i = bounding_box.min_x; i <= bounding_box.max_x; i++) {
                        var x = i + 0.5;
                        for( var j = bounding_box.min_y; j <= bounding_box.max_y; j++) {
                            var y = j + 0.5;

                            // First, we check if the pixel center is inside the primitive 
                            if ( insideWindingNumber( x, y, primitive ) ) {
                                // only solid colors for now
                                color = nj.array(primitive.color);
                                this.set_pixel( i, this.height - (j + 1), color );
                            }
                            
                        }
                    }
                }
                
            },

            set_pixel: function( i, j, colorarr ) {
                // We assume that every shape has solid color
         
                this.image.set(j, i, 0,    colorarr.get(0));
                this.image.set(j, i, 1,    colorarr.get(1));
                this.image.set(j, i, 2,    colorarr.get(2));
            },

            update: function () {
                // Loading HTML element
                var $image = document.getElementById('raster_image');
                $image.width = this.width; $image.height = this.height;

                // Saving the image
                nj.images.save( this.image, $image );
            }
        }
    );

    exports.Screen = Screen;
    
})));

