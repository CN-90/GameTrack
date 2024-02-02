export async function deleteRecord(ladderId: string, playerId: string) {
    const deletedRecord = await prisma.record.deleteMany({
        where: {
            playerId: parseInt(playerId),
            ladderId: parseInt(ladderId)
        }
    });

    return deletedRecord;
}