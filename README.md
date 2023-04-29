## findMP-a visual desktop application that detect malicious npm package

#### develop

1. install python3 (>= 3.9)

2. install python skearn (>=1.2.1)

3. install node (>=16)

4. install npm dependency. 

```bash
npm install
```

4. start app  
   
Find the src/detect.ts. If you are using node 16.x, then change NODE_PATH to "node". Else replace NODE_PATH with the path of node 16.x.

```javascript
const NODE_PATH = '/Users/huchaoqun/.nvm/versions/node/v16.16.0/bin/node'
```

Then run 
```bash
npm run start
```

#### generate platform-specific application

```bash
npm run make
```