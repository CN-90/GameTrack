import type { NextApiRequest } from 'next'


export async function createMatch(req: NextApiRequest) {
    console.log("YOU ARE CREATING A MATCH MY GUY...");
    
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