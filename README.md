<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

# 卡密验证系统

这是一个基于NestJS和TypeORM开发的卡密验证系统，使用MySQL作为数据库。系统可以生成和管理卡密，并在访问API前验证卡密的有效性。

## 功能特点

- 批量生成卡密
- 支持天卡和月卡两种类型
- 卡密首次使用后开始计算有效期
- 卡密验证接口
- 卡密有效期管理
- 查询卡密到期时间
- 自定义装饰器控制卡密验证
- 统一的响应格式

## 环境要求

- Node.js (>= 14.x)
- MySQL (>= 5.7)

## 安装与运行

1. 克隆仓库

```bash
git clone https://github.com/yourusername/kami-system.git
cd kami-system
```

2. 安装依赖

```bash
npm install
```

3. 配置数据库

编辑 `.env` 文件，修改数据库连接信息：

```
DATABASE_URL="mysql://username:password@localhost:3306/kami_system"
JWT_SECRET="your-secret-key-change-in-production"
PORT=3000
```

4. 运行应用

```bash
npm run start
```

开发模式：

```bash
npm run start:dev
```

## 卡密类型说明

系统支持两种类型的卡密：

- **天卡**：首次使用后有效期为1天
- **月卡**：首次使用后有效期为30天

卡密生成后状态为未使用(`unused`)，当首次验证通过后状态会变为已使用(`used`)，并开始计算有效期。在有效期内，已使用的卡密依然可以继续使用。超过有效期后状态会变为过期(`expired`)。

## 卡密验证机制

系统使用全局守卫和自定义装饰器组合的方式进行卡密验证：

1. `KeyCardGuard` 被设置为全局守卫，但默认不会对任何接口进行验证
2. 只有被 `@RequireKeyCard()` 装饰器标记的控制器或方法才会进行卡密验证
3. 验证时需要在请求头中设置 `X-Key-Card` 字段

示例：

```typescript
// 需要卡密验证的接口
@Get('protected')
@RequireKeyCard()
getProtectedData() {
  return { message: '已通过卡密验证' };
}

// 不需要卡密验证的接口
@Get('public')
getPublicData() {
  return { message: '公开接口，无需卡密验证' };
}
```

## API接口说明

### 1. 创建卡密批次

```
POST /api/key-cards/batch
```

请求体：

```json
{
  "name": "测试批次",
  "count": 10,
  "type": "day"  // 可选值: "day"或"month"
}
```

### 2. 验证卡密

```
POST /api/key-cards/verify
```

请求体：

```json
{
  "code": "YOUR_KEY_CARD_CODE"
}
```

### 3. 查询卡密信息（包括到期时间）

```
GET /api/key-cards/info?code=YOUR_KEY_CARD_CODE
```

响应示例：

```json
{
  "code": "1A2B3C4D5E6F7G8H",
  "status": "used",
  "type": "month",
  "firstUseTime": "2023-06-01T12:00:00.000Z",
  "expireAt": "2023-07-01T12:00:00.000Z",
  "isExpired": false,
  "remainingDays": 15,
  "remainingTime": 1296000000,
  "message": "卡密有效，剩余15天"
}
```

### 4. 访问受保护的API

```
GET /api/key-cards/protected-data
```

请求头：

```
X-Key-Card: YOUR_KEY_CARD_CODE
```

### 5. 查看所有批次

```
GET /api/key-cards/batch
```

### 6. 根据批次ID查询卡密

```
GET /api/key-cards/batch/:id
```

### 7. 根据状态查询卡密

```
GET /api/key-cards/status/:status
```

状态可选值：`unused`, `used`, `expired`

## 开发者说明

- `src/key-cards`: 卡密相关功能
- `src/guards`: 卡密验证守卫
- `src/decorators`: 自定义装饰器
- `src/interceptors`: 响应格式转换
- `src/filters`: 异常处理
