(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory(global.ImageProcessing = {}));
}(this, (function (exports) { 'use strict';


    //inicializa a classe com os parametros vindos ma pagina HTML
    function ImageProcesser(img, kernel = null, xform = null, bhandler = 'icrop') {
        this.img = img.clone();
        this.transformed = img.clone();
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
                        /*for(var k=0; k<3; k++){
                            this.transformed.selection.data[(i)*this.width*4+(j)*4+k] = (4*this.img.selection.data[(i)*this.width*4+(j)*4+k]-
                            this.img.selection.data[(i+1)*this.width*4+(j)*4+k]-
                            this.img.selection.data[(i-1)*this.width*4+(j)*4+k]-
                            this.img.selection.data[(i)*this.width*4+(j+1)*4+k]-
                            this.img.selection.data[(i)*this.width*4+(j-1)*4+k])*(I/4);*/
                        for(var k=0; k<3; k++){
                            this.transformed.selection.data[(i)*this.width*4+(j)*4+k] = (8*this.img.selection.data[(i)*this.width*4+(j)*4+k]-
                            this.img.selection.data[(i+1)*this.width*4+(j-1)*4+k]-
                            this.img.selection.data[(i+1)*this.width*4+(j+1)*4+k]-
                            this.img.selection.data[(i+1)*this.width*4+(j)*4+k]-
                            this.img.selection.data[(i-1)*this.width*4+(j-1)*4+k]-
                            this.img.selection.data[(i-1)*this.width*4+(j+1)*4+k]-
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

        apply_xform: function()  {
            // Method to apply affine transform through inverse mapping (incomplete)
            // You may create auxiliary functions/methods if you'd like
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

