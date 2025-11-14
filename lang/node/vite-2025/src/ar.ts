import { BoxGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import * as Locar from 'locar';

console.log('Locar loaded:', Locar);

const scene = new Scene();
const camera = new PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.001, 100);
const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

const box = new BoxGeometry(2, 2, 2);
const cube = new Mesh(box, new MeshBasicMaterial({ color: 0xff0000 }));

const locar = new Locar.LocationBased(scene, camera);
const cam = new Locar.Webcam(renderer);

console.log(cam);


locar.fakeGps(-0.72, 51.05);
locar.add(cube, -0.72, 51.0501);

renderer.setAnimationLoop(animate);


function animate() {
  // cam.update();
  renderer.render(scene, camera);
}