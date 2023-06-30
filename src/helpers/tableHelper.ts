import type { NextApiRequest } from 'next'


export async function createMatch(req: NextApiRequest) {

}


export async function deleteTable(req: NextApiRequest) {
    const { tableId } = req.body;
    const table = await prisma.table.delete({
        where: {
            id: parseInt(tableId)

        }
    })
}

export async function findTableById(){
    
}