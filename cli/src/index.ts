import { Command } from 'commander'

const cmd = new Command()

cmd
  .command('create')
  .description('创建一个组件模板或配置文件')
  // 添加命令参数-t | --type,<type>表明为必选参数
  .option('-t --type <type>', '创建类型，可选值：component, lib-entry')
  // 注册回调函数
  .action(args => {
    console.log(args)
  })

// 执行命令行参数的解析
cmd.parse()
