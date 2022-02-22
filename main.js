
import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();  //Scene is like a container that holds all the objects, cameras and light

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);

const  renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30);

renderer.render( scene, camera );  //render == Draw

const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
const material = new THREE.MeshStandardMaterial( {color: 0xFF6347});
const torus = new THREE.Mesh( geometry, material );

scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5,0,5);

const ambientLight = new THREE.AmbientLightProbe(0xffffff);
scene.add(pointLight, ambientLight);

//Helpers
//const lightHelper = new THREE.PointLightHelper(pointLight);
//const gridHelper = new THREE.GridHelper(200, 50);
//scene.add(lightHelper, gridHelper);
//
const controls = new OrbitControls(camera, renderer.domElement);
var loader = new THREE.TextureLoader();
var mats = [
  './assets/pra.png', //those are strings with urls, for example: "https://threejs.org/examples/textures"/uv_grid_opengl.jpg
  './assets/prati.jpeg',
  './assets/5.png',
  './assets/2.jpeg', //those are strings with urls, for example: "https://threejs.org/examples/textures"/uv_grid_opengl.png
  './assets/3.jpeg',
  './assets/4.jpeg',
].map(pic => {
  return new THREE.MeshLambertMaterial({map: loader.load(pic)});
});
var geom = new THREE.BoxBufferGeometry(4,4,4);
var punk = new THREE.Mesh(geom, mats);
scene.add(punk);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff});
  const star = new THREE.Mesh( geometry, material);

  const [x,y,z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(100) );

  star.position.set(x,y,z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);
const spaceTexture = new THREE.TextureLoader().load('./assets/space.jpeg');
scene.background = spaceTexture;

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.position.x +=0.025;
  moon.position.y +=0.025;
  moon.position.z += 0.05;

  torus.rotation.x +=0.015;
  torus.rotation.y +=0.015;
  torus.rotation.z +=0.015;

  punk.rotation.x += 0.002;
  punk.rotation.y += 0.002;
  punk.rotation.z += 0.002;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;

}
document.body.onscroll = moveCamera

function animate() {
  requestAnimationFrame( animate );

  punk.rotation.x += 0.003;
  punk.rotation.y += 0.002;
  punk.rotation.z += 0.001;

  controls.update();

  renderer.render( scene, camera ); 
}

animate()

//Avatar

//const punkTexture = new THREE.TextureLoader().load('prat.png');


//const punk = new THREE.Mesh(
//  new THREE.BoxGeometry(4,4,4),
//  new THREE.MeshBasicMaterial({map: punkTexture})
//);
//
//scene.add(punk);


//Moon

const moonTexture = new THREE.TextureLoader().load('./assets/moon.jpeg');
const normalTexture = new THREE.TextureLoader().load('./assets/normal.jpeg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture

  })
);
scene.add(moon);

moon.position.z = 10;
moon.position.setX(-10);
