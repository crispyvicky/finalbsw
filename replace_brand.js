const fs = require('fs');
const path = require('path');

function replaceColors(dir) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            replaceColors(filePath);
        } else if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.css')) {
            let content = fs.readFileSync(filePath, 'utf8');
            let updated = false;

            if (content.includes('#3d5a45') || content.includes('#3D5A45')) {
                content = content.replace(/#3d5a45/gi, '#0F2557');
                updated = true;
            }
            if (content.includes('#ce7e48') || content.includes('#CE7E48')) {
                content = content.replace(/#ce7e48/gi, '#A0A0A0');
                updated = true;
            }

            // Also replace Infinity Interiors with BSW Interiors
            if (content.includes('Infinity Interiors')) {
                content = content.replace(/Infinity Interiors/g, 'BSW Interiors');
                updated = true;
            }

            if (updated) {
                fs.writeFileSync(filePath, content, 'utf8');
                console.log(`Updated colors/branding in: ${filePath}`);
            }
        }
    });
}

replaceColors(path.join(__dirname, 'src'));
