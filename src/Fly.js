import React, {
	Component
} from 'react';
import * as THREE from 'three';
import Colors from './Color';
class Fly extends Component {
	componentDidMount() {
		this.getSence();
		//this.createLights();
		//this.sea();
		this.star();
		this.box();
		this.anima();
	}

	getSence = () => {
		this.scene = new THREE.Scene();
		this.stargroup = new THREE.Group();
		this.scene.add(this.stargroup);
		this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
		this.renderer = new THREE.WebGLRenderer({
			antialias: true
		});
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		document.getElementById('container').appendChild(this.renderer.domElement);

	}
	createLights = () => {
		var hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, .9);
		var shadowLight = new THREE.DirectionalLight(0xffffff, .9);
		shadowLight.position.set(150, 350, 350);
		shadowLight.castShadow = true;
		shadowLight.shadow.camera.left = -400;
		shadowLight.shadow.camera.right = 400;
		shadowLight.shadow.camera.top = 400;
		shadowLight.shadow.camera.bottom = -400;
		shadowLight.shadow.camera.near = 1;
		shadowLight.shadow.camera.far = 1000;
		shadowLight.shadow.mapSize.width = 2048;
		shadowLight.shadow.mapSize.height = 2048;
		this.scene.add(hemisphereLight);
		this.scene.add(shadowLight);
	}
	sea = () => {
		var geom = new THREE.CylinderGeometry(600, 600, 800, 40, 10);

		// 创建材质
		var mat = new THREE.MeshBasicMaterial({
			color: Colors.blue,
			transparent: true,
			opacity: .6,
			shading: THREE.FlatShading
		});
		var mesh = new THREE.Mesh(geom, mat);

		this.scene.add(mesh);
	}
	star = () => {
		var geometry = new THREE.BoxGeometry(100, 100, 100); //创建一个立方体几何对象Geometry
		var material = new THREE.PointsMaterial({
			color: 0xffffff,
			size: 0.1//点对象像素尺寸
		}); //材质对象
		for (let i = 0; i < 1000; i++) {
			var points = new THREE.Points(geometry, material); //点模型对象

			this.stargroup.add(points);
			var k1 = Math.random() - 0.5;
			var k2 = Math.random() - 0.5;
			var k3 = Math.random() - 0.5;
			points.position.set(200 * k1, 200 * k3, 200 * k2)
		}
	}
	starupdate = () => {
		this.stargroup.children.forEach((onepoint)=>{
		var flag=Math.random();
		if(flag>0.5){
			onepoint.position.x=onepoint.position.x-0.01;
			if(onepoint.position.x<-1)
				onepoint.position.x=200;
		}else
			{
				onepoint.position.x=onepoint.position.x+0.01;
					if(onepoint.position.x<-1)
						onepoint.position.x=200;
			}

		});
	}


	anima = () => {
		requestAnimationFrame(this.anima);
		this.renderer.render(this.scene, this.camera);
		this.starupdate();

	}

	box = () => {
		var geometry = new THREE.BoxGeometry(100, 100, 100); //创建一个立方体几何对象Geometry
		var material = new THREE.MeshLambertMaterial({
			color: Colors.red
		}); //材质对象Material
		var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
		this.scene.add(mesh); //网格模型添加到场景中
	}
	render = () => {
		return (
			<div id='container'></div>
		)
	}








}
export default Fly;
