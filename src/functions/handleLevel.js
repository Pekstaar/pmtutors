
export const handleLevelTasks = (level) => {

    let isToTake;

    if (level === "beginner") {

        isToTake = 2;

        return isToTake;

    } else if (level === "intermediate") {

        isToTake = 4;

        return isToTake

    } else if (level === "advance") {

        isToTake = 6;

        return isToTake;

    } else if (level === "master") {

        isToTake = 10;

        return isToTake

    }
}
