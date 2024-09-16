Este README terá como finalidade exibir os comandos executados no prompt de comando, na ordem em que os mesmos são executados, para auxiliar futuras pesquisas, próprias ou de terceiros que queiram inspirar-se neste projeto!
Figma do projeto: https://www.figma.com/design/ByDjVh7THsTnsSVRKNN8yy/FSW-5.0-%5BLive%5D

inicialização do projeto:
- npx create-next-app@latest FWS-barber

inicialização do banco de dados:
- npm install prisma --save-dev

formatação do schema do banco de dados:
- npx prisma format

execução do schema no banco de dados:
- npx prisma migrate dev --name init_db

instalação do ts node:
- npm install -D ts-node

composição do banco com os dados pré escritos na seed:
- npx prisma db seed

intalação do prettier para formatação do css no tailwind:
- npm install -D prettier prettier-plugin-tailwindcss

instalação do shadcn para utilização de componente pré formatados (componentes instalados serão colocados junto a instalação ignorando a linha do tempo por motivo organizacional!):
- npx shadcn-ui@latest init
- (botão)       - npx shadcn-ui@latest add button
- (card)        - npx shadcn-ui@latest add card
- (input)       - npx shadcn-ui@latest add input
- (badge)       - npx shadcn-ui@latest add badge
- (avatar)      - npx shadcn-ui@latest add avatar
- (Toast)       - npx shadcn-ui@latest add sonner
- (SideBar)     - npx shadcn-ui@latest add sheet
- (Dialog)      - npx shadcn@latest add dialog
- (AlertDialog) - npx shadcn@latest add alert-dialog


instalação do husky e lint staged para formatação e verificação de padrão do commit:
- npm install -D husky lint-staged
- npx husky init

instalação do NextAuth para possibilitar o lonig com o Google (https://next-auth.js.org):
- npm install next-auth
- npm install @auth/prisma-adapter

implementação de setup para login com Google no schema:
- npx prisma migrate dev --name add_auth_tables

implementação de react hook form para minimizar o numero de renderizações da pagina no input:
- npx shadcn@latest add form
- npm i @hookform/resolvers
- npm install zod
