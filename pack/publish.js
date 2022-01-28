const inquirer = require('inquirer');
const execSync = require('child_process').execSync;
const path = require('path');
const root = path.resolve(__dirname, '..');

(async () => {
    execSync(`
        cd ${root}
        yarn tsc
    `);

    if (isGitClean()) return execSync(`cd ${root} && yarn publish && git push`);
    let commit = '';
    while (!commit) commit = await input('请输入提交信息');
    execSync(`
        cd ${root}
        yarn lint
        git add .
        git commit -m ${commit}
        yarn publish
        git push
    `);
})();

async function input(content) {
    const val = await ask('input', content || '请输入');
    return (val || '').trim();
}

async function ask(type, content, param) {
    const result = await inquirer.prompt({
        type: type,
        name: 'hx',
        message: content,
        ...param
    });
    return result.hx;
}

function isGitClean() {
    const result = execSync(`
        cd ${root}
        if git status --porcelain | grep .; then
            echo 1
        else
            echo 0
        fi
    `)
        .toString()
        .trim();
    return result === '0';
}
