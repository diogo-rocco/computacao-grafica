function WaveAnimation() {}

Object.assign( WaveAnimation.prototype, {

    init: function() {
        let upperArmTween = new TWEEN.Tween( {theta:0} )
            .to( {theta:Math.PI }, 500)
            .onUpdate(function(){
                // This is an example of rotation of the right_upper_arm 
                // Notice that the transform is M = T * R 
                let right_upper_arm =  robot.getObjectByName("right_upper_arm");

                var start_position = [right_upper_arm.position.x, right_upper_arm.position.y, 0];
                var pivot = [0, 1.2, 0];

                right_upper_arm.matrix.makeTranslation(0,0,0)
                .premultiply( new THREE.Matrix4().makeTranslation(-pivot[0], -pivot[1], -pivot[2]))
                .premultiply( new THREE.Matrix4().makeRotationZ(this._object.theta/2))
                .premultiply( new THREE.Matrix4().makeTranslation(pivot[0], pivot[1], pivot[2]))
                .premultiply( new THREE.Matrix4().makeTranslation(start_position[0], start_position[1], start_position[2]) );

                let left_upper_arm =  robot.getObjectByName("left_upper_arm");

                start_position = [left_upper_arm.position.x, left_upper_arm.position.y, 0];
                pivot = [0, 1.2, 0];

                left_upper_arm.matrix.makeTranslation(0,0,0)
                .premultiply( new THREE.Matrix4().makeTranslation(-pivot[0], -pivot[1], -pivot[2]))
                .premultiply( new THREE.Matrix4().makeRotationZ(-this._object.theta/16))
                .premultiply( new THREE.Matrix4().makeTranslation(pivot[0], pivot[1], pivot[2]))
                .premultiply( new THREE.Matrix4().makeTranslation(start_position[0], start_position[1], start_position[2]) );                




                // Updating final world matrix (with parent transforms) - mandatory
                right_upper_arm.updateMatrixWorld(true);
                left_upper_arm.updateMatrixWorld(true);
                // Updating screen
                stats.update();
                renderer.render(scene, camera);    
            })
            
            let lowerArmTween = new TWEEN.Tween( {theta:0} )
            .to( {theta:Math.PI }, 500)
            .onUpdate(function(){
                // This is an example of rotation of the right_upper_arm 
                // Notice that the transform is M = T * R 
                let right_upper_arm =  robot.getObjectByName("right_upper_arm");
                let right_lower_arm =  right_upper_arm.getObjectByName("lower_arm");
                
                var start_position = [right_lower_arm.position.x, right_lower_arm.position.y, 0];
                var pivot = [0, 1.2, 0];

                right_lower_arm.matrix.makeTranslation(0,0,0)
                .premultiply( new THREE.Matrix4().makeTranslation(-pivot[0], -pivot[1], -pivot[2]))
                .premultiply( new THREE.Matrix4().makeRotationZ(this._object.theta*0.65))
                .premultiply( new THREE.Matrix4().makeTranslation(pivot[0], pivot[1], pivot[2]))
                .premultiply( new THREE.Matrix4().makeTranslation(start_position[0], start_position[1], start_position[2]) );

                let left_upper_arm =  robot.getObjectByName("left_upper_arm");
                let left_lower_arm =  left_upper_arm.getObjectByName("lower_arm");
                
                var start_position = [left_lower_arm.position.x, left_lower_arm.position.y, 0];
                var pivot = [0, 1.2, 0];

                left_lower_arm.matrix.makeTranslation(0,0,0)
                .premultiply( new THREE.Matrix4().makeTranslation(-pivot[0], -pivot[1], -pivot[2]))
                .premultiply( new THREE.Matrix4().makeRotationZ(-this._object.theta/16))
                .premultiply( new THREE.Matrix4().makeTranslation(pivot[0], pivot[1], pivot[2]))
                .premultiply( new THREE.Matrix4().makeTranslation(start_position[0], start_position[1], start_position[2]) );




                // Updating final world matrix (with parent transforms) - mandatory
                right_upper_arm.updateMatrixWorld(true);
                left_upper_arm.updateMatrixWorld(true);
                // Updating screen
                stats.update();
                renderer.render(scene, camera);    
            })

            let inverseArmTween = new TWEEN.Tween( {theta:Math.PI} )
            .to( {theta:0 }, 500)
            .onUpdate(function(){
                // This is an example of rotation of the right_upper_arm 
                // Notice that the transform is M = T * R 
                let right_upper_arm =  robot.getObjectByName("right_upper_arm");
                let right_lower_arm =  right_upper_arm.getObjectByName("lower_arm");
                
                var start_position = [right_upper_arm.position.x, right_upper_arm.position.y, 0];
                var pivot = [0, 1.2, 0];
                
                //braco direito
                right_upper_arm.matrix.makeTranslation(0,0,0)
                .premultiply( new THREE.Matrix4().makeTranslation(-pivot[0], -pivot[1], -pivot[2]))
                .premultiply( new THREE.Matrix4().makeRotationZ(this._object.theta/2))
                .premultiply( new THREE.Matrix4().makeTranslation(pivot[0], pivot[1], pivot[2]))
                .premultiply( new THREE.Matrix4().makeTranslation(start_position[0], start_position[1], start_position[2]) );
                
                start_position = [right_lower_arm.position.x, right_lower_arm.position.y, 0];

                right_lower_arm.matrix.makeTranslation(0,0,0)
                .premultiply( new THREE.Matrix4().makeTranslation(-pivot[0], -pivot[1], -pivot[2]))
                .premultiply( new THREE.Matrix4().makeRotationZ(this._object.theta*0.65))
                .premultiply( new THREE.Matrix4().makeTranslation(pivot[0], pivot[1], pivot[2]))
                .premultiply( new THREE.Matrix4().makeTranslation(start_position[0], start_position[1], start_position[2]) );


                //braco esquerdo
                let left_upper_arm =  robot.getObjectByName("left_upper_arm");
                let left_lower_arm =  left_upper_arm.getObjectByName("lower_arm");

                start_position = [left_upper_arm.position.x, left_upper_arm.position.y, 0];
                pivot = [0, 1.2, 0];

                left_upper_arm.matrix.makeTranslation(0,0,0)
                .premultiply( new THREE.Matrix4().makeTranslation(-pivot[0], -pivot[1], -pivot[2]))
                .premultiply( new THREE.Matrix4().makeRotationZ(-this._object.theta/16))
                .premultiply( new THREE.Matrix4().makeTranslation(pivot[0], pivot[1], pivot[2]))
                .premultiply( new THREE.Matrix4().makeTranslation(start_position[0], start_position[1], start_position[2]) ); 


                start_position = [left_lower_arm.position.x, left_lower_arm.position.y, 0];

                left_lower_arm.matrix.makeTranslation(0,0,0)
                .premultiply( new THREE.Matrix4().makeTranslation(-pivot[0], -pivot[1], -pivot[2]))
                .premultiply( new THREE.Matrix4().makeRotationZ(-this._object.theta/16))
                .premultiply( new THREE.Matrix4().makeTranslation(pivot[0], pivot[1], pivot[2]))
                .premultiply( new THREE.Matrix4().makeTranslation(start_position[0], start_position[1], start_position[2]) );



                // Updating final world matrix (with parent transforms) - mandatory
                right_upper_arm.updateMatrixWorld(true);
                left_upper_arm.updateMatrixWorld(true);
                // Updating screen
                stats.update();
                renderer.render(scene, camera);    
            })
            
    
        //  upperArmTween.chain( ... ); this allows other related Tween animations occur at the same time
        upperArmTween.chain(lowerArmTween.chain(inverseArmTween)).start();       
    },
    animate: function(time) {
        window.requestAnimationFrame(this.animate.bind(this));
        TWEEN.update(time);
    },
    run: function() {
        this.init();
        this.animate(0);
    }
});