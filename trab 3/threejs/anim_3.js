function KarateKidAnimation() {}

Object.assign( KarateKidAnimation.prototype, {

    init: function() {
        let setUpKickTween = new TWEEN.Tween( {theta:0} )
            .to( {theta:Math.PI }, 500)
            .onUpdate(function(){
                //UPPER ARMS ROTATION
                let right_upper_arm =  robot.getObjectByName("right_upper_arm");

                var start_position = [right_upper_arm.position.x, right_upper_arm.position.y, 0];
                var pivot = [0, 1.5, 0];
                var angle = this._object.theta*(0.875);

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

                //LOWER ARMS ROTATION
                let right_lower_arm =  right_upper_arm.getObjectByName("lower_arm");
                let right_hand = right_lower_arm.getObjectByName("hand")

                var start_position = [right_hand.position.x, right_hand.position.y, 0];
                var pivot = [-0.5, 0, 0];
                var angle = this._object.theta;

                right_hand.matrix.makeTranslation(0,0,0)
                .premultiply( new THREE.Matrix4().makeTranslation(-pivot[0], -pivot[1], -pivot[2]))
                .premultiply( new THREE.Matrix4().makeRotationZ(-angle))
                .premultiply( new THREE.Matrix4().makeTranslation(pivot[0], pivot[1], pivot[2]))
                .premultiply( new THREE.Matrix4().makeTranslation(start_position[0], start_position[1], start_position[2]) );

                let left_lower_arm =  left_upper_arm.getObjectByName("lower_arm");
                let left_hand = left_lower_arm.getObjectByName("hand")

                start_position = [left_hand.position.x, left_hand.position.y, 0];
                pivot = [0.5, 0, 0];

                left_hand.matrix.makeTranslation(0,0,0)
                .premultiply( new THREE.Matrix4().makeTranslation(-pivot[0], -pivot[1], -pivot[2]))
                .premultiply( new THREE.Matrix4().makeRotationZ(angle))
                .premultiply( new THREE.Matrix4().makeTranslation(pivot[0], pivot[1], pivot[2]))
                .premultiply( new THREE.Matrix4().makeTranslation(start_position[0], start_position[1], start_position[2]) );       

                //UPPER RIGHT LEG ROTATION
                let left_upper_leg =  robot.getObjectByName("left_upper_leg");

                var start_position = [left_upper_leg.position.x, left_upper_leg.position.y, 0];
                var pivot = [0, 1.5, 0];
                var angle = this._object.theta*(0.65);

                left_upper_leg.matrix.makeTranslation(0,0,0)
                .premultiply( new THREE.Matrix4().makeTranslation(-pivot[0], -pivot[1], -pivot[2]))
                .premultiply( new THREE.Matrix4().makeRotationZ(-angle))
                .premultiply( new THREE.Matrix4().makeTranslation(pivot[0], pivot[1], pivot[2]))
                .premultiply( new THREE.Matrix4().makeTranslation(start_position[0], start_position[1], start_position[2]) );

                //LOWER RIGHT LEG ROTATION
                let left_lower_leg =  left_upper_leg.getObjectByName("lower_leg");

                var start_position = [left_lower_leg.position.x, left_lower_leg.position.y, 0];
                var pivot = [0, 1.5, 0];
                var angle = this._object.theta*(0.65);

                left_lower_leg.matrix.makeTranslation(0,0,0)
                .premultiply( new THREE.Matrix4().makeTranslation(-pivot[0], -pivot[1], -pivot[2]))
                .premultiply( new THREE.Matrix4().makeRotationZ(angle))
                .premultiply( new THREE.Matrix4().makeTranslation(pivot[0], pivot[1], pivot[2]))
                .premultiply( new THREE.Matrix4().makeTranslation(start_position[0], start_position[1], start_position[2]) );

                // Updating final world matrix (with parent transforms) - mandatory
                right_upper_arm.updateMatrixWorld(true);
                left_upper_arm.updateMatrixWorld(true);
                left_upper_leg.updateMatrixWorld(true);
                // Updating screen
                stats.update();
                renderer.render(scene, camera);
            })

            let kickTween = new TWEEN.Tween( {theta:0} )
            .to( {theta:Math.PI }, 500)
            .onUpdate(function(){
                //LOWER RIGHT LEG ROTATION
                let left_upper_leg = robot.getObjectByName("left_upper_leg");
                let left_lower_leg =  left_upper_leg.getObjectByName("lower_leg");

                var start_position = [left_lower_leg.position.x, left_lower_leg.position.y, 0];
                var pivot = [0, 1.5, 0];
                var angle = this._object.theta*(0.65);

                left_lower_leg.matrix.makeTranslation(0,0,0)
                .premultiply( new THREE.Matrix4().makeTranslation(-pivot[0], -pivot[1], -pivot[2]))
                .premultiply( new THREE.Matrix4().makeRotationZ(angle))
                .premultiply( new THREE.Matrix4().makeTranslation(pivot[0], pivot[1], pivot[2]))
                .premultiply( new THREE.Matrix4().makeTranslation(start_position[0], start_position[1], start_position[2]) );

                // Updating final world matrix (with parent transforms) - mandatory
                left_upper_leg.updateMatrixWorld(true);
                // Updating screen
                stats.update();
                renderer.render(scene, camera);
            })

            let inverseSetUpKickTween = new TWEEN.Tween( {theta:Math.PI} )
            .to( {theta:0 }, 500)
            .onUpdate(function(){
                //UPPER ARMS ROTATION
                let right_upper_arm =  robot.getObjectByName("right_upper_arm");

                var start_position = [right_upper_arm.position.x, right_upper_arm.position.y, 0];
                var pivot = [0, 1.5, 0];
                var angle = this._object.theta*(0.875);

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

                //LOWER ARMS ROTATION
                let right_lower_arm =  right_upper_arm.getObjectByName("lower_arm");
                let right_hand = right_lower_arm.getObjectByName("hand")

                var start_position = [right_hand.position.x, right_hand.position.y, 0];
                var pivot = [-0.5, 0, 0];
                var angle = this._object.theta;

                right_hand.matrix.makeTranslation(0,0,0)
                .premultiply( new THREE.Matrix4().makeTranslation(-pivot[0], -pivot[1], -pivot[2]))
                .premultiply( new THREE.Matrix4().makeRotationZ(-angle))
                .premultiply( new THREE.Matrix4().makeTranslation(pivot[0], pivot[1], pivot[2]))
                .premultiply( new THREE.Matrix4().makeTranslation(start_position[0], start_position[1], start_position[2]) );

                let left_lower_arm =  left_upper_arm.getObjectByName("lower_arm");
                let left_hand = left_lower_arm.getObjectByName("hand")

                start_position = [left_hand.position.x, left_hand.position.y, 0];
                pivot = [0.5, 0, 0];

                left_hand.matrix.makeTranslation(0,0,0)
                .premultiply( new THREE.Matrix4().makeTranslation(-pivot[0], -pivot[1], -pivot[2]))
                .premultiply( new THREE.Matrix4().makeRotationZ(angle))
                .premultiply( new THREE.Matrix4().makeTranslation(pivot[0], pivot[1], pivot[2]))
                .premultiply( new THREE.Matrix4().makeTranslation(start_position[0], start_position[1], start_position[2]) );       

                //UPPER RIGHT LEG ROTATION
                let left_upper_leg =  robot.getObjectByName("left_upper_leg");

                var start_position = [left_upper_leg.position.x, left_upper_leg.position.y, 0];
                var pivot = [0, 1.5, 0];
                var angle = this._object.theta*(0.65);

                left_upper_leg.matrix.makeTranslation(0,0,0)
                .premultiply( new THREE.Matrix4().makeTranslation(-pivot[0], -pivot[1], -pivot[2]))
                .premultiply( new THREE.Matrix4().makeRotationZ(-angle))
                .premultiply( new THREE.Matrix4().makeTranslation(pivot[0], pivot[1], pivot[2]))
                .premultiply( new THREE.Matrix4().makeTranslation(start_position[0], start_position[1], start_position[2]) );

                //LOWER RIGHT LEG ROTATION
                let left_lower_leg =  left_upper_leg.getObjectByName("lower_leg");

                var start_position = [left_lower_leg.position.x, left_lower_leg.position.y, 0];
                var pivot = [0, 1.5, 0];
                var angle = this._object.theta*(0.65);

                left_lower_leg.matrix.makeTranslation(0,0,0)
                .premultiply( new THREE.Matrix4().makeTranslation(-pivot[0], -pivot[1], -pivot[2]))
                .premultiply( new THREE.Matrix4().makeRotationZ(angle))
                .premultiply( new THREE.Matrix4().makeTranslation(pivot[0], pivot[1], pivot[2]))
                .premultiply( new THREE.Matrix4().makeTranslation(start_position[0], start_position[1], start_position[2]) );

                // Updating final world matrix (with parent transforms) - mandatory
                right_upper_arm.updateMatrixWorld(true);
                left_upper_arm.updateMatrixWorld(true);
                left_upper_leg.updateMatrixWorld(true);
                // Updating screen
                stats.update();
                renderer.render(scene, camera);
            })
            
    
        //  upperArmTween.chain( ... ); this allows other related Tween animations occur at the same time
        setUpKickTween.chain(kickTween.chain(inverseSetUpKickTween)).start();       
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