function BalletAnimation() {}

Object.assign( BalletAnimation.prototype, {

    init: function() {
        let legsTween = new TWEEN.Tween( {theta:0} )
            .to( {theta:Math.PI }, 500)
            .onUpdate(function(){
                // UPPER LEGS ROTATION
                let right_upper_leg =  robot.getObjectByName("right_upper_leg");

                var start_position = [right_upper_leg.position.x, right_upper_leg.position.y, 0];
                var pivot = [0, 1.5, 0];
                var angle = this._object.theta/4;

                right_upper_leg.matrix.makeTranslation(0,0,0)
                .premultiply( new THREE.Matrix4().makeTranslation(-pivot[0], -pivot[1], -pivot[2]))
                .premultiply( new THREE.Matrix4().makeRotationZ(angle))
                .premultiply( new THREE.Matrix4().makeTranslation(pivot[0], pivot[1], pivot[2]))
                .premultiply( new THREE.Matrix4().makeTranslation(start_position[0], start_position[1], start_position[2]) );

                let left_upper_leg =  robot.getObjectByName("left_upper_leg");

                start_position = [left_upper_leg.position.x, left_upper_leg.position.y, 0];

                left_upper_leg.matrix.makeTranslation(0,0,0)
                .premultiply( new THREE.Matrix4().makeTranslation(-pivot[0], -pivot[1], -pivot[2]))
                .premultiply( new THREE.Matrix4().makeRotationZ(-angle))
                .premultiply( new THREE.Matrix4().makeTranslation(pivot[0], pivot[1], pivot[2]))
                .premultiply( new THREE.Matrix4().makeTranslation(start_position[0], start_position[1], start_position[2]) );                


                //LOWER LEGS ROTATION
                let right_lower_leg =  right_upper_leg.getObjectByName("lower_leg");

                var start_position = [right_lower_leg.position.x, right_lower_leg.position.y, 0];
                var pivot = [0, 1.2, 0];
                var angle = this._object.theta/2;

                right_lower_leg.matrix.makeTranslation(0,0,0)
                .premultiply( new THREE.Matrix4().makeTranslation(-pivot[0], -pivot[1], -pivot[2]))
                .premultiply( new THREE.Matrix4().makeRotationZ(-angle))
                .premultiply( new THREE.Matrix4().makeTranslation(pivot[0], pivot[1], pivot[2]))
                .premultiply( new THREE.Matrix4().makeTranslation(start_position[0], start_position[1], start_position[2]) );

                let left_lower_leg =  left_upper_leg.getObjectByName("lower_leg");

                start_position = [left_lower_leg.position.x, left_lower_leg.position.y, 0];

                left_lower_leg.matrix.makeTranslation(0,0,0)
                .premultiply( new THREE.Matrix4().makeTranslation(-pivot[0], -pivot[1], -pivot[2]))
                .premultiply( new THREE.Matrix4().makeRotationZ(angle))
                .premultiply( new THREE.Matrix4().makeTranslation(pivot[0], pivot[1], pivot[2]))
                .premultiply( new THREE.Matrix4().makeTranslation(start_position[0], start_position[1], start_position[2]) );
                
                //UPPER ARMS ROTATION
                let right_upper_arm =  robot.getObjectByName("right_upper_arm");

                var start_position = [right_upper_arm.position.x, right_upper_arm.position.y, 0];
                var pivot = [0, 1.2, 0];
                var angle = this._object.theta*(3/4);

                right_upper_arm.matrix.makeTranslation(0,0,0)
                .premultiply( new THREE.Matrix4().makeTranslation(-pivot[0], -pivot[1], -pivot[2]))
                .premultiply( new THREE.Matrix4().makeRotationZ(angle))
                .premultiply( new THREE.Matrix4().makeTranslation(pivot[0], pivot[1], pivot[2]))
                .premultiply( new THREE.Matrix4().makeTranslation(start_position[0], start_position[1], start_position[2]) );

                let left_upper_arm =  robot.getObjectByName("left_upper_arm");

                start_position = [left_upper_arm.position.x, left_upper_arm.position.y, 0];

                left_upper_arm.matrix.makeTranslation(0,0,0)
                .premultiply( new THREE.Matrix4().makeTranslation(-pivot[0], -pivot[1], -pivot[2]))
                .premultiply( new THREE.Matrix4().makeRotationZ(-angle))
                .premultiply( new THREE.Matrix4().makeTranslation(pivot[0], pivot[1], pivot[2]))
                .premultiply( new THREE.Matrix4().makeTranslation(start_position[0], start_position[1], start_position[2]) ); 


                // Updating final world matrix (with parent transforms) - mandatory
                right_upper_leg.updateMatrixWorld(true);
                left_upper_leg.updateMatrixWorld(true);
                right_upper_arm.updateMatrixWorld(true);
                left_upper_arm.updateMatrixWorld(true);
                // Updating screen
                stats.update();
                renderer.render(scene, camera);
            })

            let lowerArmTween = new TWEEN.Tween( {theta:0} )
            .to( {theta:Math.PI }, 500)
            .onUpdate(function(){
                //LOWER ARMS ROTATION
                let right_upper_arm =  robot.getObjectByName("right_upper_arm");
                let right_lower_arm =  right_upper_arm.getObjectByName("lower_arm");

                var start_position = [right_lower_arm.position.x, right_lower_arm.position.y, 0];
                var pivot = [0, 1.2, 0];
                var angle = this._object.theta*(1/2);

                right_lower_arm.matrix.makeTranslation(0,0,0)
                .premultiply( new THREE.Matrix4().makeTranslation(-pivot[0], -pivot[1], -pivot[2]))
                .premultiply( new THREE.Matrix4().makeRotationZ(angle))
                .premultiply( new THREE.Matrix4().makeTranslation(pivot[0], pivot[1], pivot[2]))
                .premultiply( new THREE.Matrix4().makeTranslation(start_position[0], start_position[1], start_position[2]) );

                let left_upper_arm =  robot.getObjectByName("left_upper_arm");
                let left_lower_arm =  left_upper_arm.getObjectByName("lower_arm");

                start_position = [left_lower_arm.position.x, left_lower_arm.position.y, 0];

                left_lower_arm.matrix.makeTranslation(0,0,0)
                .premultiply( new THREE.Matrix4().makeTranslation(-pivot[0], -pivot[1], -pivot[2]))
                .premultiply( new THREE.Matrix4().makeRotationZ(-angle))
                .premultiply( new THREE.Matrix4().makeTranslation(pivot[0], pivot[1], pivot[2]))
                .premultiply( new THREE.Matrix4().makeTranslation(start_position[0], start_position[1], start_position[2]) );

                // Updating final world matrix (with parent transforms) - mandatory
                right_upper_arm.updateMatrixWorld(true);
                left_upper_arm.updateMatrixWorld(true);
                // Updating screen
                stats.update();
                renderer.render(scene, camera);
            })

            let inverseLowerArmTween = new TWEEN.Tween( {theta:Math.PI} )
            .to( {theta:0 }, 500)
            .onUpdate(function(){
                //LOWER ARMS ROTATION
                let right_upper_arm =  robot.getObjectByName("right_upper_arm");
                let right_lower_arm =  right_upper_arm.getObjectByName("lower_arm");

                var start_position = [right_lower_arm.position.x, right_lower_arm.position.y, 0];
                var pivot = [0, 1.2, 0];
                var angle = this._object.theta*(1/2);

                right_lower_arm.matrix.makeTranslation(0,0,0)
                .premultiply( new THREE.Matrix4().makeTranslation(-pivot[0], -pivot[1], -pivot[2]))
                .premultiply( new THREE.Matrix4().makeRotationZ(angle))
                .premultiply( new THREE.Matrix4().makeTranslation(pivot[0], pivot[1], pivot[2]))
                .premultiply( new THREE.Matrix4().makeTranslation(start_position[0], start_position[1], start_position[2]) );

                let left_upper_arm =  robot.getObjectByName("left_upper_arm");
                let left_lower_arm =  left_upper_arm.getObjectByName("lower_arm");

                start_position = [left_lower_arm.position.x, left_lower_arm.position.y, 0];

                left_lower_arm.matrix.makeTranslation(0,0,0)
                .premultiply( new THREE.Matrix4().makeTranslation(-pivot[0], -pivot[1], -pivot[2]))
                .premultiply( new THREE.Matrix4().makeRotationZ(-angle))
                .premultiply( new THREE.Matrix4().makeTranslation(pivot[0], pivot[1], pivot[2]))
                .premultiply( new THREE.Matrix4().makeTranslation(start_position[0], start_position[1], start_position[2]) );

                // Updating final world matrix (with parent transforms) - mandatory
                right_upper_arm.updateMatrixWorld(true);
                left_upper_arm.updateMatrixWorld(true);
                // Updating screen
                stats.update();
                renderer.render(scene, camera);
            })

            let inverseLegsTween = new TWEEN.Tween( {theta:Math.PI} )
            .to( {theta:0 }, 500)
            .onUpdate(function(){
                // UPPER LEGS ROTATION
                let right_upper_leg =  robot.getObjectByName("right_upper_leg");

                var start_position = [right_upper_leg.position.x, right_upper_leg.position.y, 0];
                var pivot = [0, 1.5, 0];
                var angle = this._object.theta/4;

                right_upper_leg.matrix.makeTranslation(0,0,0)
                .premultiply( new THREE.Matrix4().makeTranslation(-pivot[0], -pivot[1], -pivot[2]))
                .premultiply( new THREE.Matrix4().makeRotationZ(angle))
                .premultiply( new THREE.Matrix4().makeTranslation(pivot[0], pivot[1], pivot[2]))
                .premultiply( new THREE.Matrix4().makeTranslation(start_position[0], start_position[1], start_position[2]) );

                let left_upper_leg =  robot.getObjectByName("left_upper_leg");

                start_position = [left_upper_leg.position.x, left_upper_leg.position.y, 0];

                left_upper_leg.matrix.makeTranslation(0,0,0)
                .premultiply( new THREE.Matrix4().makeTranslation(-pivot[0], -pivot[1], -pivot[2]))
                .premultiply( new THREE.Matrix4().makeRotationZ(-angle))
                .premultiply( new THREE.Matrix4().makeTranslation(pivot[0], pivot[1], pivot[2]))
                .premultiply( new THREE.Matrix4().makeTranslation(start_position[0], start_position[1], start_position[2]) );                


                //LOWER LEGS ROTATION
                let right_lower_leg =  right_upper_leg.getObjectByName("lower_leg");

                var start_position = [right_lower_leg.position.x, right_lower_leg.position.y, 0];
                var pivot = [0, 1.2, 0];
                var angle = this._object.theta/2;

                right_lower_leg.matrix.makeTranslation(0,0,0)
                .premultiply( new THREE.Matrix4().makeTranslation(-pivot[0], -pivot[1], -pivot[2]))
                .premultiply( new THREE.Matrix4().makeRotationZ(-angle))
                .premultiply( new THREE.Matrix4().makeTranslation(pivot[0], pivot[1], pivot[2]))
                .premultiply( new THREE.Matrix4().makeTranslation(start_position[0], start_position[1], start_position[2]) );

                let left_lower_leg =  left_upper_leg.getObjectByName("lower_leg");

                start_position = [left_lower_leg.position.x, left_lower_leg.position.y, 0];

                left_lower_leg.matrix.makeTranslation(0,0,0)
                .premultiply( new THREE.Matrix4().makeTranslation(-pivot[0], -pivot[1], -pivot[2]))
                .premultiply( new THREE.Matrix4().makeRotationZ(angle))
                .premultiply( new THREE.Matrix4().makeTranslation(pivot[0], pivot[1], pivot[2]))
                .premultiply( new THREE.Matrix4().makeTranslation(start_position[0], start_position[1], start_position[2]) );
                
                //UPPER ARMS ROTATION
                let right_upper_arm =  robot.getObjectByName("right_upper_arm");

                var start_position = [right_upper_arm.position.x, right_upper_arm.position.y, 0];
                var pivot = [0, 1.2, 0];
                var angle = this._object.theta*(3/4);

                right_upper_arm.matrix.makeTranslation(0,0,0)
                .premultiply( new THREE.Matrix4().makeTranslation(-pivot[0], -pivot[1], -pivot[2]))
                .premultiply( new THREE.Matrix4().makeRotationZ(angle))
                .premultiply( new THREE.Matrix4().makeTranslation(pivot[0], pivot[1], pivot[2]))
                .premultiply( new THREE.Matrix4().makeTranslation(start_position[0], start_position[1], start_position[2]) );

                let left_upper_arm =  robot.getObjectByName("left_upper_arm");

                start_position = [left_upper_arm.position.x, left_upper_arm.position.y, 0];

                left_upper_arm.matrix.makeTranslation(0,0,0)
                .premultiply( new THREE.Matrix4().makeTranslation(-pivot[0], -pivot[1], -pivot[2]))
                .premultiply( new THREE.Matrix4().makeRotationZ(-angle))
                .premultiply( new THREE.Matrix4().makeTranslation(pivot[0], pivot[1], pivot[2]))
                .premultiply( new THREE.Matrix4().makeTranslation(start_position[0], start_position[1], start_position[2]) ); 


                // Updating final world matrix (with parent transforms) - mandatory
                right_upper_leg.updateMatrixWorld(true);
                left_upper_leg.updateMatrixWorld(true);
                right_upper_arm.updateMatrixWorld(true);
                left_upper_arm.updateMatrixWorld(true);
                // Updating screen
                stats.update();
                renderer.render(scene, camera);
            })
            

        //  upperArmTween.chain( ... ); this allows other related Tween animations occur at the same time
        legsTween.chain(lowerArmTween.chain(inverseLowerArmTween.chain(inverseLegsTween))).start();       
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