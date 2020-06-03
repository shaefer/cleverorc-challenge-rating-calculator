import MonsterStatsByCR from './MonsterStatsByCR';
import {IsFortSaveGood, IsRefSaveGood, IsWillSaveGood, sum, roundDecimal} from '../AdvancementUtils';

export const calculateCR = (hp, ac, toHit, avgDamage, fort, ref, will, avgAbilityDC, creatureType, isCombat = true, isCaster = false) => {
    //we need creatureType to determine good or poor saves for each of the 3 saves. 
    //we need role of caster or melee to determine if we should rate the CR based on the high or low values for toHit, damage, and  avgAbilityDC   
    //roles: combat, caster, other...with other you will end with false on both and get judged on all the low end cr calculations which sounds right.

    //creature type can be humanoid or outsider which have various flavors of which saving throws are good. We either need to explicitly define the type or make sure that the user chooses which saves are good vs bad.


    let calculatedCrs = [];

    const hpCr = calculateHpCr(hp);
    calculatedCrs.push(hpCr);
    const acCr = calculateAcCr(ac);
    calculatedCrs.push(acCr);
    const attackCr = calculateAttackCr(toHit, isCombat);
    calculatedCrs.push(attackCr);
    const dmgCr = calculateDamageCr(avgDamage, isCombat);
    calculatedCrs.push(dmgCr);
    const saveCrs = calculatedSaveDcs(creatureType, fort, ref, will);
    if (saveCrs) {
        calculatedCrs.push(saveCrs.saves);
    }
    const abilityDcCr = calculateAbilityDcCr(avgAbilityDC, isCaster);
    calculatedCrs.push(abilityDcCr);
    
    const aggregateCr =sum(calculatedCrs) / calculatedCrs.length;
    const calculatedCr = roundDecimal(aggregateCr);
    const crObject = {
        total: calculatedCr,
        hp: hpCr,
        ac: acCr,
        attack: attackCr,
        damage: dmgCr,
        abilityDC: abilityDcCr
    };
    const mergedCrs = {
        ...crObject,
        ...saveCrs
    };
    return mergedCrs;
}

const getGoodVsPoorSaves = (creatureType, fortSave, refSave, willSave) => {
    //if we just get creatureType === 'humanoid' then we assume the highest save is the good save and the other two are poor.
    //if we just get creatureType === 'outsider' then we assume the two highest saves are the good saves and the other one is poor.
    //otherwise we calculate each based on just the creatureType given. 
    const saves = [fortSave, refSave, willSave];
    if (creatureType.toLowerCase() === 'humanoid') {
        const indexOfMaxValue = saves.indexOf(Math.max(...saves));
        if (indexOfMaxValue === 0) creatureType = 'humanoid_fort'
        if (indexOfMaxValue === 1) creatureType = 'humanoid_ref'
        if (indexOfMaxValue === 2) creatureType = 'humanoid_will'
    }
    if (creatureType.toLowerCase() === 'outsider') {
        const indexOfMinValue = saves.indexOf(Math.min(...saves));
        if (indexOfMinValue === 0) creatureType = 'outsider_ref_will';
        if (indexOfMinValue === 1) creatureType = 'outsider_fort_will';
        if (indexOfMinValue === 2) creatureType = 'outsider_fort_ref';
    }
    const savesGoodVsPoor = {
        fortGood: IsFortSaveGood(creatureType),
        refGood: IsRefSaveGood(creatureType),
        willGood: IsWillSaveGood(creatureType)
    }
    return savesGoodVsPoor;
}

const calculatedSaveDcs = (creatureType, fortSave, refSave, willSave) => {
    const saves = getGoodVsPoorSaves(creatureType, fortSave, refSave, willSave);

    const fortCr = (saves.fortGood) ? calculateGoodSaveCr(fortSave) : calculatePoorSaveCr(fortSave);
    const refCr = (saves.refGood) ? calculateGoodSaveCr(refSave) : calculatePoorSaveCr(refSave);
    const willCr = (saves.willGood) ? calculateGoodSaveCr(willSave) : calculatePoorSaveCr(willSave);

    const saveCr = roundDecimal((fortCr + refCr + willCr) / 3);
    return {
        saves:saveCr,
        fort:fortCr,
        ref:refCr,
        will:willCr
    };
}

export const calculateHpCr = (hp) => {
    return calculateStatCr('hp', hp);
}

export const calculateAcCr = (ac) => {
    return calculateStatCr('ac', ac);
}

export const calculateAttackCr = (toHit, isCombat) => {
    return (isCombat) ? calculateStatCr('highAttack', toHit) : calculateStatCr('lowAttack', toHit);
}

export const avgDiceRoll = (dieType) => {
    return dieType / 2 + 0.5;
}

export const calculateDamageCr = (avgDamage, isCombat) => {
    return (isCombat) ? calculateStatCr('avgDmgHigh', avgDamage) : calculateStatCr('avgDmgLow', avgDamage);
}

export const calculateAbilityDcCr = (dc, isCaster) => {
    return (isCaster) ? calculateStatCr('primaryAbilityDc', dc) : calculateStatCr('secondaryAbilityDc', dc);
}

export const calculateGoodSaveCr = (save) => {
    return calculateStatCr('goodSave', save);
} 

export const calculatePoorSaveCr = (save) => {
    return calculateStatCr('poorSave', save);
} 

export const calculateStatCr = (statField, value) => {
    const crEntry = MonsterStatsByCR.find(x => x[statField] <= value);
    return (crEntry) ? crEntry.cr : 0;
}