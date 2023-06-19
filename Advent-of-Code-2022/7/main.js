const fs = require("fs");

const run = 1;
const path = run ? "input" : "example"; 

const input = fs
    .readFileSync(`7/${path}.txt`)
    .toString()
    .trim()
    .split("\n");

const Directory = {
    "name": undefined,
    "parent": undefined,
    "files": undefined,
    "directories": undefined,

    init(name, parent) {
        this.name = name;
        this.parent = parent;
        this.files = [];
        this.directories = [];
    },
    addFile(file) {
        this.files.push(file);
    },
    addDir(dir) {
        this.directories.push(dir);
    },
    getSize() {
        let size = 0;
        for (let i = 0; i < this.files.length; i++) {
            size += this.files[i].size;
        }
        for (let j = 0; j < this.directories.length; j++) {
            size += this.directories[j].getSize();
        }
        return size;
    },
    hasDir(dirName) {
        return this.directories.map(dir => dir.name).includes(dirName);
    }
}

const File = {
    "name": "",
    "size": 0,
    "parent": undefined,
}

let curr = undefined;
let top = Object.create(Directory);
top.init("/", undefined);
curr = top;

for (let i = 0; i < input.length; i++) {

    const line = input[i].split(" ");

    switch (line[0]) {
        case "$":
            switch (line[1]) {
                case "cd":
                    switch (line[2]) {
                        case "..":
                            curr = curr.parent;
                            break;
                        case line[2].match(/\w*/)[0]:
                            if (!curr.hasDir(line[2])) {
                                const dir = Object.create(Directory);
                                dir.init(line[2], curr);

                                curr.addDir(dir);
                                curr = dir;
                            } else {
                                curr = curr.directories.find(dir => dir.name === line[2]);
                            }
                            break;
                    }
                    break;
                case "ls":
                    break;
            }
            break;
        case "dir":
            if (!curr.hasDir(line[1])) {
                const dir = Object.create(Directory);
                dir.init(line[1], curr)

                curr.addDir(dir);
            }
            break;
        case line[0].match(/\d*/)[0]:
            const file = Object.create(File);
            file.name = line[1];
            file.size = +line[0];
            file.parent = curr;
            curr.addFile(file)
            break;
    } 
}

function printDir(top) {

}

function solve1(dir) {
    let count = 0;
    for (let i = 0; i < dir.directories.length; i++) {
        count += solve1(dir.directories[i])
    }
    const size = dir.getSize()
    if (size <= 100000) {
        return size + count;
    } else {
        return 0 + count;
    }
}

const available = 70000000 - top.getSize();
const need = 30000000 - available;
let maybes = [];

function solve2(dir) {
    const size = dir.getSize()
    if (size > need) {
        maybes.push(size);
    }
    for (let i = 0; i < dir.directories.length; i++) {
        solve2(dir.directories[i]);
    }
}

solve2(top);
console.log(maybes.sort(function(a, b){return a-b})[0])
