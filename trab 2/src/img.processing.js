(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory(global.ImageProcessing = {}));
}(this, (function (exports) { 'use strict';


    //inicializa a classe com os parametros vindos ma pagina HTML
    function ImageProcesser(img, kernel = null, xform = null, bhandler = 'icrop') {
        this.img = img.clone();
        this.transformed = img.clone();
        this.transformed_xform = img.clone();
        this.width = img.shape[1];
        this.heigth = img.shape[0];
        this.kernel = kernel;
        this.xform = xform;
        this.bhandler = bhandler;
    }

    Object.assign( ImageProcesser.prototype, {

        box_filter: function(border){
            if(border == 'icrop'){
                for(var i=1; i<this.heigth-1; i++){
                    for(var j=1; j<this.width-1; j++){
                        for(var k=0; k<4; k++){
                            var sum = 0;
                            for(var i2 = -1; i2<2; i2++)
                                for(var j2 = -1; j2<2; j2++)
                                    sum += this.img.selection.data[(i-i2)*this.width*4+(j-j2)*4+k];
                            
                            this.transformed.selection.data[(i)*this.width*4+(j)*4+k] = sum/9
                        }
                    }
                }
            }

            if(border == 'extend'){
                for(var i=1; i<this.heigth-1; i++){
                    for(var j=1; j<this.width-1; j++){
                        for(var k=0; k<4; k++){
                            var sum = 0;
                            for(var i2 = -1; i2<2; i2++)
                                for(var j2 = -1; j2<2; j2++)
                                    sum += this.img.selection.data[(i-i2)*this.width*4+(j-j2)*4+k];
                            
                            this.transformed.selection.data[(i)*this.width*4+(j)*4+k] = sum/9
                        }
                    }
                }

                for(var i=0; i<this.heigth; i += this.heigth-1){
                    for(var j=0; j<this.width; j += this.width-1){
                        for(var k=0; k<4; k++){
                            var sum = 0;
                            for(var i2 = -1; i2<2; i2++){
                                for(var j2 = -1; j2<2; j2++){
                                    if(i==0 && j==0)
                                        sum += this.img.selection.data[0];
                                    else if(i==0)
                                        sum += this.img.selection.data[(j-j2)*4+k];
                                    else if(j==0)
                                        sum += this.img.selection.data[(i)*this.width*4];
                                    
                                    else if(i==this.heigth-1 && j==this.width-1)
                                        sum += this.img.selection.data[this.img.selection.data.size-1];
                                    else if(i==this.heigth-1)
                                        sum += this.img.selection.data[(i)*this.width*4+(j-j2)*4+k];
                                    else if(j==this.width-1)
                                        sum += this.img.selection.data[(i-i2)*this.width*4+(j)*4+k];
                                }
                            }
                            
                            this.transformed.selection.data[(i)*this.width*4+(j)*4+k] = sum/9
                        }
                    }
                }
            }
        },

        laplace_filter: function(border){
            var I = 1/2;
            if(border == 'icrop'){
                for(var i=1; i<this.heigth-1; i++){
                    for(var j=1; j<this.width-1; j++){
                        for(var k=0; k<3; k++){
                            this.transformed.selection.data[(i)*this.width*4+(j)*4+k] = (4*this.img.selection.data[(i)*this.width*4+(j)*4+k]-
                            this.img.selection.data[(i+1)*this.width*4+(j)*4+k]-
                            this.img.selection.data[(i-1)*this.width*4+(j)*4+k]-
                            this.img.selection.data[(i)*this.width*4+(j+1)*4+k]-
                            this.img.selection.data[(i)*this.width*4+(j-1)*4+k])*(I/4);
                        }
                    }
                }
            }

        },

        sobel_filter: function(border){
            if(border == 'icrop'){
                for(var i=1; i<this.heigth-1; i++){
                    for(var j=1; j<this.width-1; j++){
                        for(var k=0; k<3; k++){
                            var sx = (-1*this.img.selection.data[(i-1)*this.width*4+(j-1)*4+k]+
                            this.img.selection.data[(i-1)*this.width*4+(j+1)*4+k]-
                            2*this.img.selection.data[(i)*this.width*4+(j-1)*4+k]+
                            2*this.img.selection.data[(i)*this.width*4+(j+1)*4+k]-
                            this.img.selection.data[(i+1)*this.width*4+(j-1)*4+k]+
                            this.img.selection.data[(i+1)*this.width*4+(j+1)*4+k])/8;

                            var sy = (this.img.selection.data[(i-1)*this.width*4+(j-1)*4+k]+
                            2*this.img.selection.data[(i-1)*this.width*4+(j)*4+k]+
                            this.img.selection.data[(i-1)*this.width*4+(j+1)*4+k]-
                            this.img.selection.data[(i+1)*this.width*4+(j-1)*4+k]-
                            2*this.img.selection.data[(i+1)*this.width*4+(j)*4+k]-
                            this.img.selection.data[(i+1)*this.width*4+(j+1)*4+k])/8;

                            this.transformed.selection.data[(i)*this.width*4+(j)*4+k] = Math.sqrt(sx*sx + sy*sy)
                        }
                    }
                }
            }
        },

        apply_kernel: function(border = 'icrop') {
            if(this.kernel == "box") this.box_filter(border);
            else if(this.kernel == "laplace") { this.laplace_filter(border);}
            else if(this.kernel == "sobel") this.sobel_filter(border);
        },

        find_inverse: function(){
            var a_11 = this.xform.selection.data[0*3+0]
            var a_12 = this.xform.selection.data[0*3+1]
            var a_13 = this.xform.selection.data[0*3+2]
            var a_21 = this.xform.selection.data[1*3+0]
            var a_22 = this.xform.selection.data[1*3+1]
            var a_23 = this.xform.selection.data[1*3+2]
            var a_31 = this.xform.selection.data[2*3+0]
            var a_32 = this.xform.selection.data[2*3+1]
            var a_33 = this.xform.selection.data[2*3+2]
            
            var det = a_11*a_22*a_33+a_21*a_32*a_13+a_31*a_12*a_23-(a_13*a_22*a_31+a_23*a_32*a_11+a_33*+a_12*a_21)

            var inv_11 = (a_22*a_33-a_23*a_32)/det
            var inv_21 = (-a_21*a_33+a_23*a_31)/det
            var inv_31 = (a_21*a_32-a_22*a_31)/det
            var inv_12 = (-a_12*a_33+a_13*a_32)/det
            var inv_22 = (a_11*a_33-a_13*a_31)/det
            var inv_32 = (-a_11*a_32+a_12*a_31)/det
            var inv_13 = (a_12*a_23-a_13*a_22)/det
            var inv_23 = (-a_11*a_23+a_13*a_21)/det
            var inv_33 = (a_11*a_22-a_12*a_21)/det

            return nj.array([[inv_11, inv_12, inv_13], [inv_21, inv_22, inv_23], [inv_31, inv_32, inv_33]])
        },

        inverse_map: function(pos_i, pos_j, x, y){
            var i_pos_before_transform = Math.floor(x);
            var j_pos_before_transform = Math.floor(y);

            var a = x-i_pos_before_transform;
            var b = y-j_pos_before_transform;

            for(var k=0; k<4; k++){
                this.transformed_xform.selection.data[(pos_i)*this.width*4+(pos_j)*4+k] = (1-a)*(1-b)*this.transformed.selection.data[(i_pos_before_transform)*this.width*4+(j_pos_before_transform)*4+k]+
                a*(1-b)*this.transformed.selection.data[(i_pos_before_transform+1)*this.width*4+(j_pos_before_transform)*4+k]+
                a*b*this.transformed.selection.data[(i_pos_before_transform+1)*this.width*4+(j_pos_before_transform+1)*4+k]+
                (1-a)*b*this.transformed.selection.data[(i_pos_before_transform)*this.width*4+(j_pos_before_transform+1)*4+k]
            }
        },

        apply_xform: function()  {
            var inverse = this.find_inverse()
            var x_position;
            var y_position;

            for(var i=0; i<this.heigth; i++){
                for(var j=0; j<this.width; j++){
                    x_position = i*inverse.selection.data[0*3+0]+j*inverse.selection.data[0*3+1];
                    y_position = i*inverse.selection.data[1*3+0]+j*inverse.selection.data[1*3+1];
                    this.inverse_map(i, j, x_position, y_position);
                }
            }

            this.transformed = this.transformed_xform;
        },

        update: function() {
            // Method to process image and present results
            var start = new Date().valueOf();
            
            if(this.kernel != null) {
                this.apply_kernel(this.bhandler);
            }
            
            if(this.xform != null) {
                this.apply_xform();
            }

            // Loading HTML elements and saving
            /*
            var $transformed = document.getElementById('transformed');
            $transformed.width = this.width; $transformed.height = this.height;
            nj.images.save(transformed, $transformed);
            var duration = new Date().valueOf() - start;
            document.getElementById('duration').textContent = '' + duration;
            */

            return this.transformed;
        }

    } )


    exports.ImageProcesser = ImageProcesser;
    
    
})));

