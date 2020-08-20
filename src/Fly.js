import React, {
	Component
} from 'react';
import * as THREE from 'three';
import Colors from './Color';
import {
	OrbitControls
} from 'three/examples/jsm/controls/OrbitControls'
class Fly extends Component {
	componentDidMount() {
		this.getSence();
		this.createLights();
		//this.sea();
		this.star(5000);
		this.control();
		this.play();
		this.anima();
	}

	getSence = () => {
		this.scene = new THREE.Scene();
		this.stargroup = new THREE.Group();
		this.scene.add(this.stargroup);
		this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
		this.renderer = new THREE.WebGLRenderer({});
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		document.getElementById('container').appendChild(this.renderer.domElement);
		this.camera.position.z = 5;


	}
	createLights = () => {
		var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
		directionalLight.position.set(0, 1, 0);
		this.scene.add(directionalLight);
	}
	sea = () => {
		var geom = new THREE.CylinderGeometry(2, 2, 4, 40, 10);

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
	star = (starnum) => {
		var geometry = new THREE.BoxGeometry(1000, 1000, 1000); //创建一个立方体几何对象Geometry
		var material = new THREE.PointsMaterial({
			color: 0xffffff,
			size: 0.2 //点对象像素尺寸
		}); //材质对象
		for (let i = 0; i < starnum; i++) {
			var points = new THREE.Points(geometry, material); //点模型对象

			this.stargroup.add(points);
			var k1 = Math.random() - 0.5;
			var k2 = Math.random() - 0.5;
			var k3 = Math.random() - 0.5;
			points.position.set(2000 * k1, 2000 * k3, 2000 * k2)
		}
	}
	starupdate = () => {
		this.stargroup.children.forEach((onepoint) => {
			var flag = Math.random();
			if (flag > 0.5) {
				onepoint.position.x = onepoint.position.x - 0.008;
				if (onepoint.position.x < -1)
					onepoint.position.x = 200;
			} else {
				onepoint.position.x = onepoint.position.x + 0.008;
				if (onepoint.position.x < -1)
					onepoint.position.x = 200;
			}

		});

		var delta = this.clock.getDelta(); //获取时间差
		this.orbitControls.update(delta); //更新时间


	}


	anima = () => {
		requestAnimationFrame(this.anima);
		this.renderer.render(this.scene, this.camera);
		this.starupdate();

	}

	control = () => {
		this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement);
		this.orbitControls.target = new THREE.Vector3(0, 0, 0); //控制焦点
		this.clock = new THREE.Clock(); //用于更新轨道控制器
	}
	play = () => {
		// 初始化一个侦听器
		var audioListener = new THREE.AudioListener();

		// 添加该侦听器到相机中
		this.camera.add(audioListener);

		// 实例化一个音频（环境音）对象
		var oceanAmbientSound = new THREE.Audio(audioListener);

		// 把该对象添加到场景中去
		this.scene.add(oceanAmbientSound);

		// 实例化一个加载器
		var loader = new THREE.AudioLoader();

		// 通过URL加载一个资源
		loader.load(
			// 资源链接
			// 资源加载完成后的回调函数
			'http://m128.xiami.net/169/7169/2102855812/1796760812_1505546880428.mp3?auth_key=1598497200-0-0-399eb7a09b693f1d987b4e34de2700db',
			function(audioBuffer) {
				// set the audio object buffer to the loaded object
				oceanAmbientSound.setBuffer(audioBuffer);

				// 播放音频
				oceanAmbientSound.play();
			},
			// 资源加载过程中的回调函数
			function(xhr) {
				console.log((xhr.loaded / xhr.total * 100) + '% loaded');
			},
			// 资源下载错误的回调函数
			function(xhr) {
				console.log('An error happened');
			}
		);
	}
	render = () => {
		return (
			<div id='container'></div>
		)
	}








}
export default Fly;
