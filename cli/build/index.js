"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const inquirer_1 = require("inquirer");
// 创建类型
const CREATE_TYPES = ['component', 'lib-entry'];
const cmd = new commander_1.Command();
cmd
    .command('create')
    .description('创建一个组件模板或配置文件')
    // 添加命令参数-t | --type,<type>表明为必选参数
    .option('-t --type <type>', '创建类型，可选值：component, lib-entry')
    // 注册回调函数
    .action(async (args) => {
    let { type } = args;
    if (!type) {
        const result = await inquirer_1.default.prompt([
            {
                // 获取输入后的属性名
                name: 'type',
                // 交互方式为列表
                type: 'list',
                // 提示信息
                message: '（必填）请选择创建类型：',
                // 选项列表
                choices: CREATE_TYPES,
                // 默认选项
                default: 0
            }
        ]);
        type = result.type;
    }
});
// 执行命令行参数的解析
cmd.parse();
