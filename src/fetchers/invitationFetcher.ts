import prisma from "../../prisma/prisma";

// See if user has already received an invitation to this group.
export async function getInvitation(recipient, groupId){
    return await prisma.invitation.findFirst({
        where: {
            sentToId: parseInt(recipient),
            groupId: parseInt(groupId),
        }
    })
}