import fs from 'fs';

export default async function globalTeardown(){
    fs.rmSync('playwright/.auth/user.json', {
        force: true
    });
}