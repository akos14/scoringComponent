# Pontozó komponens készítése React-ben

_Kliensoldali webprogramozás 1. beadandó_ : 2021.04.24.

A feladat: Pontozó komponens
A feladat egy React-ben megírt pontozó komponens implementálása. A komponens célja, hogy egy előre definiált szerkezetben meghatározott feladatsor értékelését támogassa.

A komponenst tetszőleges alkalmazásban lehessen használni. Ennek szimulálására létrehoztunk egy keretprogramot, mely meghívja ezt a komponenst, és a következőket várja el tőle:

a pontozási szempontrendszert meg lehessen neki adni kötött formátumban (criteria);
sikeres kitöltés után visszakaphassuk az ereményeket (onSubmit);
értesülhessünk, ha a kitöltés félbe lett szakítva (onCancel).
<ScoringComponent
criteria={json_data}
onSubmit={results => console.log(results)}
onCancel={draft => console.log(draft)}
/>
A bemenet: criteria
A komponens criteria paraméterében JSON formában határozhatjuk meg a szempontrendszert, azaz a feladatsorban lévő feladatokat, valamint az azon belüli szempontokat (a pontos formátumot ld. lejjebb). A megkapott adat szerkezete, felépítése helyes, azt ellenőrizni nem kell.

A feladatsorhoz tartozó adatmodellnek tartalmaznia kell a benne szereplő feladatokat. A feladatok pedig különböző szempontokkal kell, hogy rendelkezzenek, mindegyiknél ismert azok:

rövid elnevezése,
típusa,
szám (0 és maximális érték közötti egész szám)
lista (lista elemei előre definiáltak, elemenként meghatározott értékkel)
logikai érték (igaz esetén van értéke, hamis esetén 0, a kötelezőség nem érvényes rá)
részletes leírása,
kötelezősége.
A bemenet formátumának helyességét ugyan ellenőrizni nem kell, de arra fel kell készíteni a komponenst, ha nincs feladat, vagy egy feladaton belül nincsenek szempontok. Ekkor erről jelenjen meg információ valamilyen formában.

{
"name": "Verseny neve",
"tasks": [
{
"name": "1. feladat",
"aspects": [
{
"id": 11,
"name": "1. szempont",
"type": "list",
"values": {
"good": 5,
"bad": 0
},
"required": true
}
]
},
{
"name": "2. feladat",
"aspects": [
{
"id": 21,
"name": "1. szempont",
"description": "1. szempont leírása",
"type": "number",
"maxValue": 5,
"required": true
},
{
"id": 22,
"name": "2. szempont",
"description": "2. szempont leírása",
"type": "number",
"maxValue": 4,
"required": true
},
{
"id": 23,
"name": "3. szempont",
"description": "3. szempont leírása",
"type": "number",
"maxValue": 6,
"required": true
},
{
"id": 24,
"name": "4. szempont",
"description": "4. szempont leírása",
"type": "number",
"maxValue": 4,
"required": false
}
]
},
{
"name": "3. feladat",
"aspects": [
{
"id": 31,
"name": "1. szempont",
"type": "boolean",
"value": 2
}
]
}
]
}
Működés
A feladatokat és az azon belüli szempontokat tetszőleges, de jól olvasható, strukturált formában kell megjeleníteni úgy, hogy mindig egyszerre csak egy feladat szempontjai jelenjenek meg. Azaz lehessen váltogatni a feladatok között, és ha egy feladat ki van jelölve, akkor jelenjenek meg a feladathoz tartozó szempontok. Az alábbi példában egy lehetséges felbontás látható, ahol a feladatok külön tabon, míg a szempontok egy táblázat soraiban helyezkednek el.

pontozo.png

A feladatlista tartalmazza a feladatok nevét, valamint információt arról, hogy hány feladatból hány van helyesen és rosszul kitöltve (példánkon a már értékelt szempontokat egy pipa ikonnal, a hibásakat pedig egy x jellel jelöltük). A feladatok között lehessen különböző módokon navigálni: feladatlistában kattintva (pl tabok), előző-következő gombokkal.

Egy feladaton belül tüntessük fel a feladathoz tartozó szempontokat: a szempont nevét, űrlapelemét és leírását. Az űrlapelem a szempont típusának megfelelő legyen. A leírás megjelenhet vagy opcionálisan az egeret fölé húzva is megjeleníthető (tooltip). A pontozás közben elvétett hibákat jelezni kell (könnyen értelmezhető hibaszöveggel). Ilyen hibák lehetnek, ha a felhasználó:

nem számot ír be szám mezőnél,
nem 0 – maxValue közötti számot ad meg,
kötelező mezőt nem tölt ki. A hibákat akkor is nyomon lehet követni, amennyiben nem az aktuális feladatnál szerepel. Azaz valahol legyen egy hibalista, amelyben egy elemre kattintva az adott feladat és azon belül a hibás szempont jelenik meg.
Kitöltés közben tüntessük fel az értékelt pontszámok összegét és a kötelező mezőkből maximálisan összegyűjthető pontszámok összegét, és egy progress barral is jelezzük, hogy hol tart a folyamat.

Elvárás az igényes megjelenés. Ehhez használhatsz saját CSS-t is, de komponens függvénykönyvárakat is, mint pl. Material UI (Linkek egy külső oldalra) vagy Bootstrap (Linkek egy külső oldalra).

A kimenet: onSubmit és onCancel
A komponensben legyen két gomb:

Mentés: ez addig nem aktív, amíg a kötelező mezők ki nincsenek töltve. Ha aktív és rákattintunk, akkor az onSubmit eseményt hívja meg a kimeneti adattal (ld lejjebb).
Mégsem: ez bármikor meghívható. Rákattintva csak a kitöltött mezőkkel kell előállítani a kimeneti formátumot és meghívni az onCancel eseményt.
A kimeneti formátumban a szempontok azonosítójához kell az értéket rendelni a következő formátumban:

{
"results": [
{
"id": 11,
"value": 5
},
{
"id": 21,
"value": 4
},
{
"id": 22,
"value": 4
},
{
"id": 23,
"value": 2
},
{
"id": 24,
"value": 0
},
{
"id": 31,
"value": 0
}
]
}
