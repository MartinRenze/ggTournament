import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { AuthenticationService } from '../shared/authentication.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-do-bann',
  templateUrl: './do-bann.component.html',
  styleUrls: ['./do-bann.component.scss']
})
export class DoBannComponent implements OnInit {

    id: string;
    tournamentId: string;
    match: Observable<any[]>;
    bannSpieler: string = '';
    bannSpielerId: string;
    spielerNummer: any;
    matchSubscription: any;
    oldFormVals: any;

    public cards =
        [{
            "key": "knight",
            "name": "Knight",
            "name_de": "Ritter",
            "elixir": 3,
            "type": "Troop",
            "rarity": "Common",
            "arena": 0,
            "description": "A tough melee fighter. The Barbarian's handsome, cultured cousin. Rumor has it that he was knighted based on the sheer awesomeness of his mustache alone.",
            "id": 26000000
        },
        {
            "key": "archers",
            "name": "Archers",
            "name_de": "Bogenschützen",
            "elixir": 3,
            "type": "Troop",
            "rarity": "Common",
            "arena": 0,
            "description": "A pair of lightly armored ranged attackers. They'll help you take down ground and air units, but you're on your own with hair coloring advice.",
            "id": 26000001
        },
        {
            "key": "goblins",
            "name": "Goblins",
            "name_de": "Kobolde",
            "elixir": 2,
            "type": "Troop",
            "rarity": "Common",
            "arena": 1,
            "description": "Three fast, unarmored melee attackers. Small, fast, green and mean!",
            "id": 26000002
        },
        {
            "key": "giant",
            "name": "Giant",
            "name_de": "Riese",
            "elixir": 5,
            "type": "Troop",
            "rarity": "Rare",
            "arena": 0,
            "description": "Slow but durable, only attacks buildings. A real one-man wrecking crew!",
            "id": 26000003
        },
        {
            "key": "pekka",
            "name": "P.E.K.K.A",
            "name_de": "P.E.K.K.A.",
            "elixir": 7,
            "type": "Troop",
            "rarity": "Epic",
            "arena": 4,
            "description": "A heavily armored, slow melee fighter. Swings from the hip, but packs a huge punch.",
            "id": 26000004
        },
        {
            "key": "minions",
            "name": "Minions",
            "name_de": "Lakaien",
            "elixir": 3,
            "type": "Troop",
            "rarity": "Common",
            "arena": 0,
            "description": "Three fast, unarmored flying attackers. Roses are red, minions are blue, they can fly, and will crush you!",
            "id": 26000005
        },
        {
            "key": "balloon",
            "name": "Balloon",
            "name_de": "Ballon",
            "elixir": 5,
            "type": "Troop",
            "rarity": "Epic",
            "arena": 2,
            "description": "As pretty as they are, you won't want a parade of THESE balloons showing up on the horizon. Drops powerful bombs and when shot down, crashes dealing area damage.",
            "id": 26000006
        },
        {
            "key": "witch",
            "name": "Witch",
            "name_de": "Hexe",
            "elixir": 5,
            "type": "Troop",
            "rarity": "Epic",
            "arena": 0,
            "description": "Summons Skeletons, shoots destructo beams, has glowing pink eyes that unfortunately don't shoot lasers.",
            "id": 26000007
        },
        {
            "key": "barbarians",
            "name": "Barbarians",
            "name_de": "Barbaren",
            "elixir": 5,
            "type": "Troop",
            "rarity": "Common",
            "arena": 3,
            "description": "A horde of melee attackers with mean mustaches and even meaner tempers.",
            "id": 26000008
        },
        {
            "key": "golem",
            "name": "Golem",
            "name_de": "Golem",
            "elixir": 8,
            "type": "Troop",
            "rarity": "Epic",
            "arena": 3,
            "description": "Slow but durable, only attacks buildings. When destroyed, explosively splits into two Golemites and deals area damage!",
            "id": 26000009
        },
        {
            "key": "skeletons",
            "name": "Skeletons",
            "name_de": "Skelette",
            "elixir": 1,
            "type": "Troop",
            "rarity": "Common",
            "arena": 2,
            "description": "Three fast, very weak melee fighters. Surround your enemies with this pile of bones!",
            "id": 26000010
        },
        {
            "key": "valkyrie",
            "name": "Valkyrie",
            "name_de": "Walküre",
            "elixir": 4,
            "type": "Troop",
            "rarity": "Rare",
            "arena": 2,
            "description": "Tough melee fighter, deals area damage around her. Swarm or horde, no problem! She can take them all out with a few spins.",
            "id": 26000011
        },
        {
          "key":"goblin-cage",
          "name":"Goblin Cage",
          "name_de": "Koboldkäfig",
          "elixir":4,
          "type":"Building",
          "rarity":"Rare",
          "arena":12,
          "description":"When the Goblin Cage is destroyed, a Goblin Brawler is unleashed into the Arena! Goblin Brawler always skips leg day.",
          "id":27000012
        },
        {
          "key":"wall-breakers",
          "name":"Wall Breakers",
          "name_de": "Mauerbrecher",
          "elixir":2,
          "type":"Troop",
          "rarity":"Epic",
          "arena":0,
          "description":"A daring duo of dangerous dive bombers. Nothing warms a Wall Breaker's cold and undead heart like blowing up buildings.",
          "id":26000058
        },
        {
            "key": "skeleton-army",
            "name": "Skeleton Army",
            "name_de": "Skelettarmee",
            "elixir": 3,
            "type": "Troop",
            "rarity": "Epic",
            "arena": 0,
            "description": "Spawns an army of Skeletons. Meet Larry and his friends Harry, Gerry, Terry, Mary, etc.",
            "id": 26000012
        },
        {
            "key": "bomber",
            "name": "Bomber",
            "name_de": "Bomber",
            "elixir": 3,
            "type": "Troop",
            "rarity": "Common",
            "arena": 2,
            "description": "Small, lightly protected skeleton that throws bombs. Deals area damage that can wipe out a swarm of enemies.",
            "id": 26000013
        },
        {
            "key": "musketeer",
            "name": "Musketeer",
            "name_de": "Musketierin",
            "elixir": 4,
            "type": "Troop",
            "rarity": "Rare",
            "arena": 0,
            "description": "Don't be fooled by her delicately coiffed hair, the Musketeer is a mean shot with her trusty boomstick.",
            "id": 26000014
        },
        {
            "key": "baby-dragon",
            "name": "Baby Dragon",
            "name_de": "Drachenbaby",
            "elixir": 4,
            "type": "Troop",
            "rarity": "Epic",
            "arena": 0,
            "description": "Flying troop that deals area damage. Baby dragons hatch cute, hungry and ready for a barbeque.",
            "id": 26000015
        },
        {
          "key":"electro-dragon",
          "name":"Electro Dragon",
          "name_de": "Elektrodrache",
          "elixir":5,
          "type":"Troop",
          "rarity":"Epic",
          "arena":11,
          "description":"Spits out bolts of electricity hitting up to three targets. Suffers from middle child syndrome to boot.",
          "id":26000063
        },
        {
            "key": "prince",
            "name": "Prince",
            "name_de": "Prinz",
            "elixir": 5,
            "type": "Troop",
            "rarity": "Epic",
            "arena": 0,
            "description": "Don't let the little pony fool you. Once the Prince gets a running start, you WILL be trampled. Deals double damage once he gets charging.",
            "id": 26000016
        },
        {
            "key": "wizard",
            "name": "Wizard",
            "name_de": "Magier",
            "elixir": 5,
            "type": "Troop",
            "rarity": "Rare",
            "arena": 5,
            "description": "The most awesome man to ever set foot in the Arena, the Wizard will blow you away with his handsomeness... and/or fireballs.",
            "id": 26000017
        },
        {
            "key": "mini-pekka",
            "name": "Mini P.E.K.K.A",
            "name_de": "Mini-P.E.K.K.A.",
            "elixir": 4,
            "type": "Troop",
            "rarity": "Rare",
            "arena": 0,
            "description": "The Arena is a certified butterfly-free zone. No distractions for P.E.K.K.A, only destruction.",
            "id": 26000018
        },
        {
            "key": "spear-goblins",
            "name": "Spear Goblins",
            "name_de": "Speerkobolde",
            "elixir": 2,
            "type": "Troop",
            "rarity": "Common",
            "arena": 1,
            "description": "Three unarmored ranged attackers. Who the heck taught these guys to throw spears!? Who thought that was a good idea?!",
            "id": 26000019
        },
        {
            "key": "giant-skeleton",
            "name": "Giant Skeleton",
            "name_de": "Riesenskelett",
            "elixir": 6,
            "type": "Troop",
            "rarity": "Epic",
            "arena": 2,
            "description": "The bigger the skeleton, the bigger the bomb. Carries a bomb that blows up when the Giant Skeleton dies.",
            "id": 26000020
        },
        {
            "key": "hog-rider",
            "name": "Hog Rider",
            "name_de": "Schweinereiter",
            "elixir": 4,
            "type": "Troop",
            "rarity": "Rare",
            "arena": 1,
            "description": "Fast melee troop that targets buildings and can jump over the river. He followed the echoing call of \"Hog Riderrrrr\" all the way through the Arena doors.",
            "id": 26000021
        },
        {
            "key": "minion-horde",
            "name": "Minion Horde",
            "name_de": "Lakaienhorde",
            "elixir": 5,
            "type": "Troop",
            "rarity": "Common",
            "arena": 4,
            "description": "Six fast, unarmored flying attackers. Three's a crowd, six is a horde!",
            "id": 26000022
        },
        {
            "key": "ice-wizard",
            "name": "Ice Wizard",
            "name_de": "Eismagier",
            "elixir": 3,
            "type": "Troop",
            "rarity": "Legendary",
            "arena": 8,
            "description": "This chill caster throws ice shards that slow down enemies' movement and attack speed. Despite being freezing cold, he has a handlebar mustache that's too hot for TV.",
            "id": 26000023
        },
        {
            "key": "royal-giant",
            "name": "Royal Giant",
            "name_de": "Königsriese",
            "elixir": 6,
            "type": "Troop",
            "rarity": "Common",
            "arena": 7,
            "description": "Destroying enemy buildings with his massive cannon is his job; making a raggedy blond beard look good is his passion.",
            "id": 26000024
        },
        {
            "key": "guards",
            "name": "Guards",
            "name_de": "Wächter",
            "elixir": 3,
            "type": "Troop",
            "rarity": "Epic",
            "arena": 7,
            "description": "Three ruthless bone brothers with shields. Knock off their shields and all that's left are three ruthless bone brothers.",
            "id": 26000025
        },
        {
            "key": "princess",
            "name": "Princess",
            "name_de": "Prinzessin",
            "elixir": 3,
            "type": "Troop",
            "rarity": "Legendary",
            "arena": 7,
            "description": "This stunning Princess shoots flaming arrows from long range. If you're feeling warm feelings towards her, it's probably because you're on fire.",
            "id": 26000026
        },
        {
            "key": "dark-prince",
            "name": "Dark Prince",
            "name_de": "Dunkler Prinz",
            "elixir": 4,
            "type": "Troop",
            "rarity": "Epic",
            "arena": 7,
            "description": "The Dark Prince deals area damage and lets his spiked club do the talking for him - because when he does talk, it sounds like he has a bucket on his head.",
            "id": 26000027
        },
        {
            "key": "three-musketeers",
            "name": "Three Musketeers",
            "name_de": "Drei Musketierinnen",
            "elixir": 9,
            "type": "Troop",
            "rarity": "Rare",
            "arena": 7,
            "description": "Trio of powerful, independent markswomen, fighting for justice and honor. Disrespecting them would not be just a mistake, it would be a cardinal sin!",
            "id": 26000028
        },
        {
            "key": "lava-hound",
            "name": "Lava Hound",
            "name_de": "Lavahund",
            "elixir": 7,
            "type": "Troop",
            "rarity": "Legendary",
            "arena": 4,
            "description": "The Lava Hound is a majestic flying beast that attacks buildings. The Lava Pups are less majestic angry babies that attack anything.",
            "id": 26000029
        },
        {
            "key": "ice-spirit",
            "name": "Ice Spirit",
            "name_de": "Eisgeist",
            "elixir": 1,
            "type": "Troop",
            "rarity": "Common",
            "arena": 8,
            "description": "Spawns one lively little Ice Spirit to freeze a group of enemies. Stay frosty.",
            "id": 26000030
        },
        {
            "key": "fire-spirits",
            "name": "Fire Spirits",
            "name_de": "Feuergeister",
            "elixir": 2,
            "type": "Troop",
            "rarity": "Common",
            "arena": 5,
            "description": "These three Fire Spirits are on a kamikaze mission to give you a warm hug. It'd be adorable if they weren't on fire.",
            "id": 26000031
        },
        {
            "key": "miner",
            "name": "Miner",
            "name_de": "Tunnelgräber",
            "elixir": 3,
            "type": "Troop",
            "rarity": "Legendary",
            "arena": 4,
            "description": "The Miner can burrow his way underground and appear anywhere in the Arena. It's not magic, it's a shovel.",
            "id": 26000032
        },
        {
            "key": "sparky",
            "name": "Sparky",
            "name_de": "Funki",
            "elixir": 6,
            "type": "Troop",
            "rarity": "Legendary",
            "arena": 11,
            "description": "Sparky slowly charges up, then unloads MASSIVE area damage. Overkill isn't in her vocabulary.",
            "id": 26000033
        },
        {
            "key": "bowler",
            "name": "Bowler",
            "name_de": "Bowler",
            "elixir": 5,
            "type": "Troop",
            "rarity": "Epic",
            "arena": 8,
            "description": "This big blue dude digs the simple things in life - Dark Elixir drinks and throwing rocks. His massive boulders roll through their target, hitting everything behind for a strike!",
            "id": 26000034
        },
        {
            "key": "lumberjack",
            "name": "Lumberjack",
            "name_de": "Holzfäller",
            "elixir": 4,
            "type": "Troop",
            "rarity": "Legendary",
            "arena": 8,
            "description": "He chops trees by day and hunts The Log by night. His bottle of Rage spills everywhere when he dies.",
            "id": 26000035
        },
        {
            "key": "battle-ram",
            "name": "Battle Ram",
            "name_de": "Rammbock",
            "elixir": 4,
            "type": "Troop",
            "rarity": "Rare",
            "arena": 3,
            "description": "Two Barbarians holding a big log charge at the nearest building, dealing significant damage if they connect; then they go to town with their swords!",
            "id": 26000036
        },
        {
          "key":"ram-rider",
          "name":"Ram Rider",
          "name_de": "Widderreiterin",
          "elixir":5,
          "type":"Troop",
          "rarity":"Legendary",
          "arena":10,
          "description":"Together they charge through the Arena; snaring enemies, knocking down towers ... and chewing grass!?",
          "id":26000051
        },
        {
          "key":"fisherman",
          "name":"Fisherman",
          "name_de": "Fischer",
          "elixir":3,
          "type":"Troop","rarity":"Legendary",
          "arena":10,
          "description":"His Ranged Attack can pull enemies towards him, and pull himself to enemy buildings. He's also mastered the ancient art of 'Fish Slapping'.",
          "id":26000061
        },
        {
          "key": "earthquake",
          "name": "Earthquake",
          "name_de": "Erdbeben",
          "elixir": "3",
          "type": "Spell",
          "rarity": "Rare",
          "arena": "9",
          "description": "Deals Damage per second to Troops and Crown Towers. Deals huge Building Damage! Does not affect flying units (it is an EARTHquake, after all).",
          "id": "28000014"
        },
        {
          "key":"elixir-golem",
          "name":"Elixir Golem",
          "name_de": "Elixir Golem",
          "elixir":3,
          "type":"Troop",
          "rarity":"Rare",
          "arena":12,
          "description":"Splits into two Elixir Golemites when destroyed, which split into two sentient Blobs when defeated. A Blob gives your opponent 1 Elixir when destroyed!",
          "id":26000067
        },
        {
          "key":"barbarian-barrel",
          "name":"Barbarian Barrel",
          "name_de": "Barbarenfass",
          "elixir":2,"type":"Spell",
          "rarity":"Epic","arena":3,
          "description":"It rolls over and damages anything in its path, then breaks open and out pops a Barbarian! How did he get inside?!",
          "id":28000015
        },
        {
            "key": "inferno-dragon",
            "name": "Inferno Dragon",
            "name_de": "Infernodrache",
            "elixir": 4,
            "type": "Troop",
            "rarity": "Legendary",
            "arena": 6,
            "description": "Shoots a focused beam of fire that increases in damage over time. Wears a helmet because flying can be dangerous.",
            "id": 26000037
        },
        {
            "key": "ice-golem",
            "name": "Ice Golem",
            "name_de": "Eisgolem",
            "elixir": 2,
            "type": "Troop",
            "rarity": "Rare",
            "arena": 8,
            "description": "He's tough, targets buildings and explodes when destroyed, slowing nearby enemies. Made entirely out of ice... or is he?! Yes.",
            "id": 26000038
        },
        {
            "key": "mega-minion",
            "name": "Mega Minion",
            "name_de": "Megalakai",
            "elixir": 3,
            "type": "Troop",
            "rarity": "Rare",
            "arena": 4,
            "description": "Flying, armored and powerful. What could be its weakness?! Cupcakes.",
            "id": 26000039
        },
        {
            "key": "dart-goblin",
            "name": "Dart Goblin",
            "name_de": "Blasrohrkobold",
            "elixir": 3,
            "type": "Troop",
            "rarity": "Rare",
            "arena": 9,
            "description": "Runs fast, shoots far and chews gum. How does he blow darts with a mouthful of Double Trouble Gum? Years of didgeridoo lessons.",
            "id": 26000040
        },
        {
            "key": "goblin-gang",
            "name": "Goblin Gang",
            "name_de": "Koboldgang",
            "elixir": 3,
            "type": "Troop",
            "rarity": "Common",
            "arena": 9,
            "description": "Spawns five Goblins - three with knives, two with spears - at a discounted Elixir cost. It's like a Goblin Value Pack!",
            "id": 26000041
        },
        {
            "key": "electro-wizard",
            "name": "Electro Wizard",
            "name_de": "Elektromagier",
            "elixir": 4,
            "type": "Troop",
            "rarity": "Legendary",
            "arena": 11,
            "description": "He lands with a \"POW!\", stuns nearby enemies and shoots lightning with both hands! What a show off.",
            "id": 26000042
        },
        {
            "key": "elite-barbarians",
            "name": "Elite Barbarians",
            "name_de": "Elitebarbaren",
            "elixir": 6,
            "type": "Troop",
            "rarity": "Common",
            "arena": 10,
            "description": "Spawns a pair of leveled up Barbarians. They're like regular Barbarians, only harder, better, faster and stronger.",
            "id": 26000043
        },
        {
            "key": "hunter",
            "name": "Hunter",
            "name_de": "Jäger",
            "elixir": 4,
            "type": "Troop",
            "rarity": "Epic",
            "arena": 1,
            "description": "He deals BIG damage up close - not so much at range. What he lacks in accuracy, he makes up for with his impressively bushy eyebrows.",
            "id": 26000044
        },
        {
            "key": "executioner",
            "name": "Executioner",
            "name_de": "Scharfrichter",
            "elixir": 5,
            "type": "Troop",
            "rarity": "Epic",
            "arena": 9,
            "description": "He throws his axe like a boomerang, striking all enemies on the way out AND back. It's a miracle he doesn't lose an arm.",
            "id": 26000045
        },
        {
            "key": "bandit",
            "name": "Bandit",
            "name_de": "Banditin",
            "elixir": 3,
            "type": "Troop",
            "rarity": "Legendary",
            "arena": 9,
            "description": "The Bandit dashes to her target and delivers an extra big hit! While dashing, she can't be touched. The mask keeps her identity safe, and gives her bonus cool points!",
            "id": 26000046
        },
        {
            "key": "royal-recruits",
            "name": "Royal Recruits",
            "name_de": "Königsrekruten",
            "elixir": 8,
            "type": "Troop",
            "rarity": "Common",
            "arena": 7,
            "description": "Deploys a line of recruits armed with spears, shields and wooden buckets. They dream of ponies and one day wearing metal buckets.",
            "id": 26000047
        },
        {
            "key": "night-witch",
            "name": "Night Witch",
            "name_de": "Nachthexe",
            "elixir": 4,
            "type": "Troop",
            "rarity": "Legendary",
            "arena": 5,
            "description": "Summons Bats to do her bidding, even after death! If you get too close, she isn't afraid of pitching in with her mean-looking battle staff.",
            "id": 26000048
        },
        {
            "key": "bats",
            "name": "Bats",
            "name_de": "Fledermäuse",
            "elixir": 2,
            "type": "Troop",
            "rarity": "Common",
            "arena": 5,
            "description": "Spawns a handful of tiny flying creatures. Think of them as sweet, purple... balls of DESTRUCTION!",
            "id": 26000049
        },
        {
            "key": "royal-ghost",
            "name": "Royal Ghost",
            "name_de": "Königsgeist",
            "elixir": 3,
            "type": "Troop",
            "rarity": "Legendary",
            "arena": 7,
            "description": "He drifts invisibly through the Arena until he's startled by an enemy... then he attacks! Then he's invisible again! Zzzz.",
            "id": 26000050
        },
        {
            "key": "zappies",
            "name": "Zappies",
            "name_de": "Zappys",
            "elixir": 4,
            "type": "Troop",
            "rarity": "Rare",
            "arena": 11,
            "description": "Spawns a pack of miniature Zap machines. Who controls them...? Only the Master Builder knows.",
            "id": 26000052
        },
        {
            "key": "rascals",
            "name": "Rascals",
            "name_de": "Rabauken",
            "elixir": 5,
            "type": "Troop",
            "rarity": "Common",
            "arena": 9,
            "description": "Spawns a mischievous trio of Rascals! The boy takes the lead, while the girls pelt enemies from behind... with slingshots full of Double Trouble Gum!",
            "id": 26000053
        },
        {
            "key": "cannon-cart",
            "name": "Cannon Cart",
            "name_de": "Kanonenkarre",
            "elixir": 5,
            "type": "Troop",
            "rarity": "Epic",
            "arena": 6,
            "description": "A Cannon on wheels?! Bet they won't see that coming! Once you break its shield, it becomes a Cannon not on wheels.",
            "id": 26000054
        },
        {
            "key": "mega-knight",
            "name": "Mega Knight",
            "name_de": "Megaritter",
            "elixir": 7,
            "type": "Troop",
            "rarity": "Legendary",
            "arena": 10,
            "description": "He lands with the force of 1,000 mustaches, then jumps from one foe to the next dealing huge area damage. Stand aside!",
            "id": 26000055
        },
        {
            "key": "skeleton-barrel",
            "name": "Skeleton Barrel",
            "name_de": "Skelettfass",
            "elixir": 3,
            "type": "Troop",
            "rarity": "Common",
            "arena": 6,
            "description": "It's a Skeleton party in the sky, until all the balloons pop... then it's a Skeleton party on the ground!",
            "id": 26000056
        },
        {
            "key": "flying-machine",
            "name": "Flying Machine",
            "name_de": "Flugmaschine",
            "elixir": 4,
            "type": "Troop",
            "rarity": "Rare",
            "arena": 6,
            "description": "The Master Builder has sent his first contraption to the Arena! It's a fast and fun flying machine, but fragile!",
            "id": 26000057
        },
        {
            "key": "royal-hogs",
            "name": "Royal Hogs",
            "name_de": "Königsschweinchen",
            "elixir": 5,
            "type": "Troop",
            "rarity": "Rare",
            "arena": 10,
            "description": "The King's personal pets are loose! They love to chomp on apples and towers alike - who let the hogs out?!",
            "id": 26000059
        },
        {
            "key": "magic-archer",
            "name": "Magic Archer",
            "name_de": "Magieschütze",
            "elixir": 4,
            "type": "Troop",
            "rarity": "Legendary",
            "arena": 10,
            "description": "Not quite a Wizard, nor an Archer - he shoots a magic arrow that passes through and damages all enemies in its path. It's not a trick, it's magic!",
            "id": 26000062
        },
        {
            "key": "cannon",
            "name": "Cannon",
            "name_de": "Kanone",
            "elixir": 3,
            "type": "Building",
            "rarity": "Common",
            "arena": 3,
            "description": "Defensive building. Shoots cannonballs with deadly effect, but cannot target flying troops.",
            "id": 27000000
        },
        {
            "key": "goblin-hut",
            "name": "Goblin Hut",
            "name_de": "Koboldhütte",
            "elixir": 5,
            "type": "Building",
            "rarity": "Rare",
            "arena": 1,
            "description": "Building that spawns Spear Goblins. Don't look inside... you don't want to see how they're made.",
            "id": 27000001
        },
        {
            "key": "mortar",
            "name": "Mortar",
            "name_de": "Minenwerfer",
            "elixir": 4,
            "type": "Building",
            "rarity": "Common",
            "arena": 6,
            "description": "Defensive building with a long range. Shoots big boulders that deal area damage, but cannot hit targets that get too close!",
            "id": 27000002
        },
        {
            "key": "inferno-tower",
            "name": "Inferno Tower",
            "name_de": "Infernoturm",
            "elixir": 5,
            "type": "Building",
            "rarity": "Rare",
            "arena": 4,
            "description": "Defensive building, roasts targets for damage that increases over time. Burns through even the biggest and toughest enemies!",
            "id": 27000003
        },
        {
            "key": "bomb-tower",
            "name": "Bomb Tower",
            "name_de": "Bombenturm",
            "elixir": 4,
            "type": "Building",
            "rarity": "Rare",
            "arena": 10,
            "description": "Defensive building that houses a Bomber. Deals area damage to anything dumb enough to stand near it.",
            "id": 27000004
        },
        {
            "key": "barbarian-hut",
            "name": "Barbarian Hut",
            "name_de": "Barbarenhütte",
            "elixir": 7,
            "type": "Building",
            "rarity": "Rare",
            "arena": 3,
            "description": "Building that periodically spawns Barbarians to fight the enemy. Time to make the Barbarians!",
            "id": 27000005
        },
        {
            "key": "tesla",
            "name": "Tesla",
            "name_de": "Tesla",
            "elixir": 4,
            "type": "Building",
            "rarity": "Common",
            "arena": 11,
            "description": "Defensive building. Whenever it's not zapping the enemy, the power of Electrickery is best kept grounded.",
            "id": 27000006
        },
        {
            "key": "elixir-collector",
            "name": "Elixir Collector",
            "name_de": "Elixiersammler",
            "elixir": 6,
            "type": "Building",
            "rarity": "Rare",
            "arena": 8,
            "description": "You gotta spend Elixir to make Elixir.",
            "id": 27000007
        },
        {
            "key": "x-bow",
            "name": "X-Bow",
            "name_de": "X-Bogen",
            "elixir": 6,
            "type": "Building",
            "rarity": "Epic",
            "arena": 6,
            "description": "Nice tower you got there. Would be a shame if this X-Bow whittled it down from this side of the Arena...",
            "id": 27000008
        },
        {
            "key": "tombstone",
            "name": "Tombstone",
            "name_de": "Grabstein",
            "elixir": 3,
            "type": "Building",
            "rarity": "Rare",
            "arena": 2,
            "description": "Troop building that periodically deploys Skeletons to fight the enemy. When destroyed, spawns 4 Skeletons. Creepy!",
            "id": 27000009
        },
        {
            "key": "furnace",
            "name": "Furnace",
            "name_de": "Ofen",
            "elixir": 4,
            "type": "Building",
            "rarity": "Rare",
            "arena": 5,
            "description": "The Furnace spawns two Fire Spirits at a time. It also makes great brick-oven pancakes.",
            "id": 27000010
        },
        {
            "key": "fireball",
            "name": "Fireball",
            "name_de": "Feuerball",
            "elixir": 4,
            "type": "Spell",
            "rarity": "Rare",
            "arena": 0,
            "description": "Annnnnd... Fireball. Incinerates a small area, dealing high damage. Reduced damage to Crown Towers.",
            "id": 28000000
        },
        {
            "key": "arrows",
            "name": "Arrows",
            "name_de": "Pfeile",
            "elixir": 3,
            "type": "Spell",
            "rarity": "Common",
            "arena": 0,
            "description": "Arrows pepper a large area, damaging all enemies hit. Reduced damage to Crown Towers.",
            "id": 28000001
        },
        {
            "key": "rage",
            "name": "Rage",
            "name_de": "Wut",
            "elixir": 2,
            "type": "Spell",
            "rarity": "Epic",
            "arena": 10,
            "description": "Increases troop movement and attack speed. Buildings attack faster and summon troops quicker, too. Chaaaarge!",
            "id": 28000002
        },
        {
            "key": "rocket",
            "name": "Rocket",
            "name_de": "Rakete",
            "elixir": 6,
            "type": "Spell",
            "rarity": "Rare",
            "arena": 6,
            "description": "Deals high damage to a small area. Looks really awesome doing it. Reduced damage to Crown Towers.",
            "id": 28000003
        },
        {
            "key": "goblin-barrel",
            "name": "Goblin Barrel",
            "name_de": "Koboldfass",
            "elixir": 3,
            "type": "Spell",
            "rarity": "Epic",
            "arena": 1,
            "description": "Spawns three Goblins anywhere in the Arena. It's going to be a thrilling ride, boys!",
            "id": 28000004
        },
        {
            "key": "freeze",
            "name": "Freeze",
            "name_de": "Frost",
            "elixir": 4,
            "type": "Spell",
            "rarity": "Epic",
            "arena": 5,
            "description": "Freezes troops and buildings, making them unable to move or attack. Everybody chill.",
            "id": 28000005
        },
        {
            "key": "mirror",
            "name": "Mirror",
            "name_de": "Spiegel",
            "elixir": 1,
            "type": "Spell",
            "rarity": "Epic",
            "arena": 11,
            "description": "Mirrors your last card played for +1 Elixir.",
            "id": 28000006
        },
        {
            "key": "lightning",
            "name": "Lightning",
            "name_de": "Blitz",
            "elixir": 6,
            "type": "Spell",
            "rarity": "Epic",
            "arena": 4,
            "description": "Bolts of lightning damage and stun up to three enemy troops or buildings with the most hitpoints in the target area. Reduced damage to Crown Towers.",
            "id": 28000007
        },
        {
            "key": "zap",
            "name": "Zap",
            "name_de": "Knall",
            "elixir": 2,
            "type": "Spell",
            "rarity": "Common",
            "arena": 4,
            "description": "Zaps enemies, briefly stunning them and dealing damage inside a small radius. Reduced damage to Crown Towers.",
            "id": 28000008
        },
        {
            "key": "poison",
            "name": "Poison",
            "name_de": "Gift",
            "elixir": 4,
            "type": "Spell",
            "rarity": "Epic",
            "arena": 5,
            "description": "Covers the area in a deadly toxin, damaging enemy troops and buildings over time. Yet somehow leaves the grass green and healthy. Go figure!",
            "id": 28000009
        },
        {
            "key": "graveyard",
            "name": "Graveyard",
            "name_de": "Friedhof",
            "elixir": 5,
            "type": "Spell",
            "rarity": "Legendary",
            "arena": 5,
            "description": "Surprise! It's a party. A Skeleton party, anywhere in the Arena. Yay!",
            "id": 28000010
        },
        {
            "key": "the-log",
            "name": "The Log",
            "name_de": "Kampfholz",
            "elixir": 2,
            "type": "Spell",
            "rarity": "Legendary",
            "arena": 6,
            "description": "A spilt bottle of Rage turned an innocent tree trunk into \"The Log\". Now, it seeks revenge by crushing anything in its path!",
            "id": 28000011
        },
        {
            "key": "tornado",
            "name": "Tornado",
            "name_de": "Tornado",
            "elixir": 3,
            "type": "Spell",
            "rarity": "Epic",
            "arena": 8,
            "description": "Drags enemy troops to its center while dealing damage over time, just like a magnet. A big, swirling, Tornado-y magnet. Doesn't affect buildings.",
            "id": 28000012
        },
        {
            "key": "clone",
            "name": "Clone",
            "name_de": "Klonzauber",
            "elixir": 3,
            "type": "Spell",
            "rarity": "Epic",
            "arena": 11,
            "description": "Duplicates all friendly troops in the target area. Cloned troops are fragile, but pack the same punch as the original! Doesn't affect buildings.",
            "id": 28000013
        },
        {
            "key": "barbarian-barrel",
            "name": "Barbarian Barrel",
            "name_de": "Barbarenfass",
            "elixir": 3,
            "type": "Spell",
            "rarity": "Epic",
            "arena": 3,
            "description": "It rolls over and damages anything in its path, then breaks open and out pops a Barbarian! How did he get inside?!",
            "id": 28000015
        },
        {
            "key": "heal",
            "name": "Heal",
            "name_de": "Heilung",
            "elixir": 3,
            "type": "Spell",
            "rarity": "Rare",
            "arena": 7,
            "description": "Heal your troops to keep them in the fight! Friendly troops are healed over time while in the target area. Doesn't affect buildings.",
            "id": 28000016
        },
        {
            "key": "giant-snowball",
            "name": "Giant Snowball",
            "name_de": "Großer Schneeball",
            "elixir": 2,
            "type": "Spell",
            "rarity": "Common",
            "arena": 8,
            "description": "It's HUGE! Once it began rolling down Frozen Peak, there was no stopping it. Enemies hit are knocked back and slowed down.",
            "id": 28000017
        }];

    cardImageUrl: string = "https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/cards-75/";
    cardImageFileExtension: string = ".png";


    constructor(private route: ActivatedRoute,
                private router: Router,
                private firestore: AngularFirestore,
                private authenticationService: AuthenticationService)
    {
        this.id = this.route.snapshot.params['matchId'];
        this.tournamentId = this.route.snapshot.params['id'];
        this.match = this.firestore.collection('tournaments')
        .doc(this.tournamentId)
        .collection('matches')
        .doc(this.id)
        .valueChanges() as Observable<any[]>;
    }

  ngOnInit() {
      this.matchSubscription = this.match.subscribe(val => {
          this.oldFormVals = val;
            if(this.oldFormVals.spieler1 == this.authenticationService.GetCurrentUserMail())
            {
                this.spielerNummer = 1;
                this.bannSpieler = this.oldFormVals.spieler1Bann.name_de;
                this.bannSpielerId = this.oldFormVals.spieler1Bann.key;
            }
            else if(this.oldFormVals.spieler2 == this.authenticationService.GetCurrentUserMail())
            {
                this.spielerNummer = 2;
                this.bannSpieler = this.oldFormVals.spieler2Bann.name_de;
                this.bannSpielerId = this.oldFormVals.spieler2Bann.key;
            }
        });
  }

  setBannSpieler(result){
    this.bannSpieler = result.name_de;
    this.bannSpielerId = result.key;
    if(this.spielerNummer == 1)
    {
      this.firestore.collection("tournaments")
      .doc(this.tournamentId)
      .collection("matches")
      .doc(this.id)
      .update({"spieler1Bann": result});
    } else if(this.spielerNummer == 2)
    {
      this.firestore.collection("tournaments")
      .doc(this.tournamentId)
      .collection("matches")
      .doc(this.id)
      .update({"spieler2Bann": result});
    }

  }

  ngOnDestroy() {
     this.matchSubscription.unsubscribe();
  }
}
