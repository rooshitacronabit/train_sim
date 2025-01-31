import {exec} from 'child_process';
import {resolve} from 'path';
import {renameSync, readdirSync} from 'fs';

const args = Array.from(process.argv).slice(2);
const mainModel = args[0];

function convertModel(model, resolution = 1204, instances = false, shadows = false, keepMeshes = false) {
    const strInst = instances ? ' --instanceall' : '';
    const strShadows = shadows ? ' --shadows' : '';
    const strKeepMeshes = keepMeshes ? ' --keepmeshes' : '';
    const tsxName = model.charAt(0).toUpperCase() + model.substring(1).replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    return new Promise(done => {
        exec(`npx gltfjsx ${strInst}${strShadows}${strKeepMeshes} --resolution ${resolution} --keepnames --types --output ./src/models/${tsxName}Model.tsx --transform ./src-models/${model}/${model}.gltf`, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
            const fileName = `${model}-transformed.glb`;
            renameSync(resolve('src', 'models', fileName), resolve('public', fileName));
            done();
        });
    });
}

const allModels = mainModel ? [mainModel] : readdirSync(resolve('src-models'));
const modelParams = {
    "electric-pole": [1024, true, false],
    "trees-bushes": [1024, true, false],
    "starter-signal": [1024, false, false, true],
    "home-signal": [1024, false, false, true],
    "main-starter-signal": [1024, false, false, true],
};

Promise
    .all(allModels.map(model => {
        const params = modelParams[model] || [1204, false, false];
        return convertModel(model, ...params);
    }))
    .then(() => console.log('All models converted!'))
