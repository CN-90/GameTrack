export async function deleteRecord(ladderId: string, playerId: string) {
    const deletedRecord = await prisma.record.delete({
        where: {
            playerId: parseInt(playerId),
            ladderId: parseInt(ladderId)
        }
    });

    return deletedRecord;
}