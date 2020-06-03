const creatureStatsByType = [
 {
   "creature_type": "Aberration",
   "hit_die_type": 8,
   "base_attack_bonus": "medium",
   "good_saving_throws": ["Will"],
   "skill_ranks": 4
 },
 {
   "creature_type": "Animal",
   "hit_die_type": 8,
   "base_attack_bonus": "medium",
   "good_saving_throws": ["Fort", "Ref"],
   "skill_ranks": 2
 },
 {
   "creature_type": "Construct",
   "hit_die_type": 10,
   "base_attack_bonus": "fast",
   "good_saving_throws": [],
   "skill_ranks": 2
 },
 {
   "creature_type": "Dragon",
   "hit_die_type": 12,
   "base_attack_bonus": "fast",
   "good_saving_throws": ["Fort", "Ref", "Will"],
   "skill_ranks": 6
 },
 {
   "creature_type": "Fey",
   "hit_die_type": 6,
   "base_attack_bonus": "slow",
   "good_saving_throws": ["Ref", "Will"],
   "skill_ranks": 6
 },
 {
   "creature_type": "Humanoid",
   "hit_die_type": 8,
   "base_attack_bonus": "medium",
   "good_saving_throws": "Varies (any one)",
   "skill_ranks": 2
 },
 {
  "creature_type": "Humanoid_Fort",
  "hit_die_type": 8,
  "base_attack_bonus": "medium",
  "good_saving_throws": ["Fort"],
  "skill_ranks": 2
},
{
  "creature_type": "Humanoid_Ref",
  "hit_die_type": 8,
  "base_attack_bonus": "medium",
  "good_saving_throws": ["Ref"],
  "skill_ranks": 2
},
{
  "creature_type": "Humanoid_Will",
  "hit_die_type": 8,
  "base_attack_bonus": "medium",
  "good_saving_throws": ["Will"],
  "skill_ranks": 2
},
 {
   "creature_type": "Magical beast",
   "hit_die_type": 10,
   "base_attack_bonus": "fast",
   "good_saving_throws": ["Fort", "Ref"],
   "skill_ranks": 2
 },
 {
   "creature_type": "Monstrous humanoid",
   "hit_die_type": 10,
   "base_attack_bonus": "fast",
   "good_saving_throws": ["Ref", "Will"],
   "skill_ranks": 4
 },
 {
   "creature_type": "Ooze",
   "hit_die_type": 8,
   "base_attack_bonus": "medium",
   "good_saving_throws": [],
   "skill_ranks": 2
 },
 {
  "creature_type": "Outsider",
  "hit_die_type": 10,
  "base_attack_bonus": "fast",
  "good_saving_throws": "Varies (any two)",
  "skill_ranks": 6
},
 {
   "creature_type": "Outsider_Fort_Ref",
   "hit_die_type": 10,
   "base_attack_bonus": "fast",
   "good_saving_throws": ["Fort", "Ref"],
   "skill_ranks": 6
 },
 {
  "creature_type": "Outsider_Fort_Will",
  "hit_die_type": 10,
  "base_attack_bonus": "fast",
  "good_saving_throws": ["Fort", "Will"],
  "skill_ranks": 6
},
{
  "creature_type": "Outsider_Ref_Will",
  "hit_die_type": 10,
  "base_attack_bonus": "fast",
  "good_saving_throws": ["Ref", "Will"],
  "skill_ranks": 6
},
 {
   "creature_type": "Plant",
   "hit_die_type": 8,
   "base_attack_bonus": "medium",
   "good_saving_throws": ["Fort"],
   "skill_ranks": 2
 },
 {
   "creature_type": "Undead",
   "hit_die_type": 8,
   "base_attack_bonus": "medium",
   "good_saving_throws": ["Will"],
   "skill_ranks": 4
 },
 {
   "creature_type": "Vermin",
   "hit_die_type": 8,
   "base_attack_bonus": "medium",
   "good_saving_throws": ["Fort"],
   "skill_ranks": 2
 }
];

export default creatureStatsByType;