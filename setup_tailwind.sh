#!/bin/bash

echo "1. 删除 node_modules 和锁文件"
rm -rf node_modules package-lock.json pnpm-lock.yaml

echo "2. 使用 pnpm 安装依赖"
pnpm install

echo "3. 使用 pnpm exec 运行 tailwindcss 初始化配置"
pnpm exec tailwindcss init -p

echo "Tailwind 初始化完成！"
