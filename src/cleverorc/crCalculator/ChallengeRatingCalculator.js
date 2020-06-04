import MonsterStatsByCR from './MonsterStatsByCR';
import {IsFortSaveGood, IsRefSaveGood, IsWillSaveGood, sum, roundDecimal} from './AdvancementUtils';

export const calculateCRForCreatureType = ({hp, ac, toHit, avgDamage, fort, reflex, will, avgAbilityDC, creatureType, isCombat = true, isCaster = false}) => {
    const saves = getGoodVsPoorSaves(creatureType, fort, reflex, will);
    return calculateCR(hp, ac, toHit, avgDamage, avgAbilityDC, fort, reflex, will, saves.fortGood, saves.refGood, saves.willGood, isCombat, isCaster);
};

export const calculateCR = ({hp, ac, toHit, avgDamage, avgAbilityDC, fort, reflex, will, isFortSaveGood, isReflexSaveGood, isWillSaveGood, isCombat = true, isCaster = false}) => {
    //we need creatureType to determine good or poor saves for each of the 3 saves.
    //we need role of caster or melee to determine if we should rate the CR based on the high or low values for toHit, damage, and  avgAbilityDC
    //roles: combat, caster, other...with other you will end with false on both and get judged on all the low end cr calculations which sounds right.

    //creature type can be humanoid or outsider which have various flavors of which saving throws are good. We either need to explicitly define the type or make sure that the user chooses which saves are good vs bad.


    let outputObj = {};
    let calculatedCrs = [];

    if (typeof hp !== 'undefined') {
        const hpCr = calculateHpCr(hp);
        calculatedCrs.push(hpCr);
        outputObj = {
            ...outputObj,
            hp: hpCr
        };
    }
    if (typeof ac !== 'undefined') {
        const acCr = calculateAcCr(ac);
        calculatedCrs.push(acCr);
        outputObj = {
            ...outputObj,
            ac: acCr
        };
    }
    if (typeof toHit !== 'undefined') {
        const attackCr = calculateAttackCr(toHit, isCombat);
        calculatedCrs.push(attackCr);
        outputObj = {
            ...outputObj,
            toHit: attackCr
        };
    }
    if (typeof avgDamage !== 'undefined') {
        const dmgCr = calculateDamageCr(avgDamage, isCombat);
        calculatedCrs.push(dmgCr);
        outputObj = {
            ...outputObj,
            damage: dmgCr
        };
    }
    if (typeof avgAbilityDC !== 'undefined') {
        const abilityDcCr = calculateAbilityDcCr(avgAbilityDC, isCaster);
        calculatedCrs.push(abilityDcCr);
        outputObj = {
            ...outputObj,
            abilityDC: abilityDcCr
        };
    }
    if (typeof fort !== 'undefined' && typeof reflex !== 'undefined' && typeof will !== 'undefined') {
        const saveCrs = calculatedSaveDcs(fort, reflex, will, isFortSaveGood, isReflexSaveGood, isWillSaveGood);
        if (saveCrs) {
            calculatedCrs.push(saveCrs.saves);
        }
        outputObj = {
            ...outputObj,
            ...saveCrs
        };
    }

    const aggregateCr =sum(calculatedCrs) / calculatedCrs.length;
    const calculatedCr = roundDecimal(aggregateCr);
    outputObj = {
        ...outputObj,
        total: calculatedCr
    };
    return outputObj;
};

const getGoodVsPoorSaves = (creatureType, fortSave, refSave, willSave) => {
    //if we just get creatureType === 'humanoid' then we assume the highest save is the good save and the other two are poor.
    //if we just get creatureType === 'outsider' then we assume the two highest saves are the good saves and the other one is poor.
    //otherwise we calculate each based on just the creatureType given.
    const saves = [fortSave, refSave, willSave];
    if (creatureType.toLowerCase() === 'humanoid') {
        const indexOfMaxValue = saves.indexOf(Math.max(...saves));
        if (indexOfMaxValue === 0) creatureType = 'humanoid_fort';
        if (indexOfMaxValue === 1) creatureType = 'humanoid_ref';
        if (indexOfMaxValue === 2) creatureType = 'humanoid_will';
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
    };
    return savesGoodVsPoor;
};

const calculatedSaveDcs = (fortSave, refSave, willSave, isFortSaveGood, isReflexSaveGood, isWillSaveGood) => {
    const fortCr = (isFortSaveGood) ? calculateGoodSaveCr(fortSave) : calculatePoorSaveCr(fortSave);
    const refCr = (isReflexSaveGood) ? calculateGoodSaveCr(refSave) : calculatePoorSaveCr(refSave);
    const willCr = (isWillSaveGood) ? calculateGoodSaveCr(willSave) : calculatePoorSaveCr(willSave);

    const saveCr = roundDecimal((fortCr + refCr + willCr) / 3);
    return {
        saves:saveCr,
        fort:fortCr,
        ref:refCr,
        will:willCr
    };
};

export const calculateHpCr = (hp) => {
    return calculateStatCr('hp', hp);
};

export const calculateAcCr = (ac) => {
    return calculateStatCr('ac', ac);
};

export const calculateAttackCr = (toHit, isCombat) => {
    return (isCombat) ? calculateStatCr('highAttack', toHit) : calculateStatCr('lowAttack', toHit);
};

export const avgDiceRoll = (dieType) => {
    return dieType / 2 + 0.5;
};

export const calculateDamageCr = (avgDamage, isCombat) => {
    return (isCombat) ? calculateStatCr('avgDmgHigh', avgDamage) : calculateStatCr('avgDmgLow', avgDamage);
};

export const calculateAbilityDcCr = (dc, isCaster) => {
    return (isCaster) ? calculateStatCr('primaryAbilityDc', dc) : calculateStatCr('secondaryAbilityDc', dc);
};

export const calculateGoodSaveCr = (save) => {
    return calculateStatCr('goodSave', save);
};

export const calculatePoorSaveCr = (save) => {
    return calculateStatCr('poorSave', save);
};

export const calculateStatCr = (statField, value) => {
    const crEntry = MonsterStatsByCR.find(x => x[statField] <= value);
    return (crEntry) ? crEntry.cr : 0;
};