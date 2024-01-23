import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from "gsap";


export default class Room{
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.Resources;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;
        this.roomChildren = {};

        this.lerp = {
            current:0,
            target: 0,
            ease:0.1,
        };
        
        this.setModel();
        this.onMouseMove();
    }

    setModel() {
        this.actualRoom.children.forEach((child) => {
            child.castShadow = true;
            child.receiveShadow = true;

            if(child instanceof THREE.Group) {
                child.children.forEach((groupchild) => {
                    groupchild.castShadow = true;
                    groupchild.receiveShadow = true;
                });

            }

            if (child.name === "Computer") {
                child.children[1].material =  new THREE.MeshBasicMaterial({
                    map: this.resources.items.screen,

                });
            }

            if (child.name === "MiniFloor") {
                child.position.x = -2.9521;
                child.position.z = -0.93572;
            }
           
            // if (
            //     child.name === "Mailbox" ||
            //     child.name === "Lamp" ||
            //     child.name === "FloorFirst" ||
            //     child.name === "FloorSecond" ||
            //     child.name === "FloorThird" ||
            //     child.name === "Dirt" ||
            //     child.name === "Flower" ||
            //     child.name === "Flower1" ||
            //     child.name === "Flower2"
            // ) {
            //     child.scale.set(0, 0, 0);
            // }
            child.scale.set(0, 0, 0);
            if (child.name === "Cube") {
                // child.scale.set(1, 1, 1);
                child.position.set(0, -1, 0);
                child.rotation.y = Math.PI / 4;
            }

            this.roomChildren[child.name.toLowerCase()] = child;
        });


        this.scene.add(this.actualRoom);
        
        // this.actualRoom.rotation.y = Math.PI*(3/2);

        const light = new THREE.PointLight( 0xffffff, 0.5, 100 );
        light.position.set( -5.9, 8.9 ,3.84 );
        this.actualRoom.add( light );
        this.roomChildren["light"] = light;

        this.scene.add(this.actualRoom);
        this.actualRoom.scale.set(0.11, 0.11, 0.11);
      
    }
    
    onMouseMove() {
        window.addEventListener("mousemove", (e)=>{
            this.rotation =
                ((e.clientX - window.innerWidth / 2)*2) /window.innerWidth;
            this.lerp.target = this.rotation * 0.1;
        });
    }

    resize(){
        
    }

    update(){
        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );

        this.actualRoom.rotation.y = this.lerp.current;
    }


} 