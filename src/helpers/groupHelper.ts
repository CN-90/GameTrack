import prisma from "../../prisma/prisma";

export async function getGroupById(groupId: number){
    return await prisma.group.findUnique({
        where: {
            id: groupId
        },
        include: {
            members: true,
        }
    });
}