import creatureStatsByType from './creatureStatsByType';

//TODO: There is a MonsterConstants file we should decide if we should use for these magic strings.
export const IsFortSaveGood = (creatureType) => {
    const creatureTypeInfo = getCreatureTypeInfo(creatureType);
    return creatureTypeInfo.good_saving_throws.indexOf("Fort") !== -1;
}

export const IsRefSaveGood = (creatureType) => {
    const creatureTypeInfo = getCreatureTypeInfo(creatureType);
    return creatureTypeInfo.good_saving_throws.indexOf("Ref") !== -1; 
}

export const IsWillSaveGood = (creatureType) => {
    const creatureTypeInfo = getCreatureTypeInfo(creatureType);
    return creatureTypeInfo.good_saving_throws.indexOf("Will") !== -1;  
}

export const getCreatureTypeInfo = (creatureType) => {
    const creatureTypeInfo = creatureStatsByType.find(x => x.creature_type.toLowerCase() === creatureType.toLowerCase());
    if (!creatureTypeInfo) throw `creatureType: ${creatureType} was not found.`
}

export const roundDecimal = (num) => {
    //return +(Math.round(num + "e+2")  + "e-2"); //https://stackoverflow.com/questions/11832914/round-to-at-most-2-decimal-places-only-if-necessary
    return Math.round( num * 1e2 ) / 1e2; //https://stackoverflow.com/questions/2283566/how-can-i-round-a-number-in-javascript-tofixed-returns-a-string/14978830    
}

export const sum = (someArray) => {
    return someArray.reduce((arr, n) => arr + n);
}
