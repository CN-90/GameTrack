import type { NextApiRequest } from 'next'


export async function createMatch(req: NextApiRequest) {
    
}


// model Match {
//     id       Int     @id @default(autoincrement())
//     table    Table   @relation(fields: [tableId], references: [id])
//     tableId  Int
//     users    User[]
//     Group    Group?  @relation(fields: [groupId], references: [id])
//     groupId  Int?
//     players  Player? @relation(fields: [playerId], references: [id])
//     playerId Int?
//   }