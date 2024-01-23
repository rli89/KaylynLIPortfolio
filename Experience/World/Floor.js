import * as THREE from "three";
import Experience from "../Experience.js";


export default class Floor{
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        
        this.setCircles();
        this.setFloor();

    }

    setFloor() {
        this.geometry = new THREE.PlaneGeometry(100, 100);
        this.material = new THREE.MeshStandardMaterial({
            color:0xffe6a2,
            side: THREE.BackSide,
        });
        this.plane = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.plane);
        this.plane.rotation.x = Math.PI / 2;
        this.plane.position.y = -0.2;
        this.plane.receiveShadow = true;
        
    }

    setCircles() {
        
        const geometry = new THREE.CircleGeometry(5, 64);
        const material = new THREE.MeshStandardMaterial({ color: 0xe19959});
        const material2 = new THREE.MeshStandardMaterial({ color: 0xcac35c });
        const material3 = new THREE.MeshStandardMaterial({ color: 0xefaeaa });

        this.circleFirst = new THREE.Mesh(geometry, material);
        this.circleSecond = new THREE.Mesh(geometry, material2);
        this.circleThird = new THREE.Mesh(geometry, material3);
       

        this.circleFirst.position.y = -0.09;
        this.circleSecond.position.y = -0.08;
        this.circleSecond.position.x = 2;
        this.circleThird.position.y = -0.07;

        this.circleFirst.scale.set(0, 0, 0);
        this.circleSecond.scale.set(0, 0, 0);
        this.circleThird.scale.set(0, 0, 0);

        this.circleFirst.rotation.x =
            this.circleSecond.rotation.x =
            this.circleThird.rotation.x =
                -Math.PI / 2;

        this.circleFirst.receiveShadow =
            this.circleSecond.receiveShadow =
            this.circleThird.receiveShadow =
                true;

        this.scene.add(this.circleFirst);
        this.scene.add(this.circleSecond);
        this.scene.add(this.circleThird);
        
    }
   
    resize(){
        
    }

    update(){
    }



} 