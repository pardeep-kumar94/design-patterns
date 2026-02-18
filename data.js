const patternsData = [
    // --- BEHAVIORAL PATTERNS ---
    {
        id: "strategy",
        name: "Strategy",
        category: "Behavioral",
        tagline: "The 'Plug-and-Play' of Algorithms",
        story: {
            title: "The RPG Character Weapon Crisis",
            context: "Imagine you're building an RPG game. You have a character class 'Hero'. Initially, the hero just used a sword.",
            problem: "The Product Owner comes in and says: 'Hey, we need bows! And magic staffs! And axes!' So you, being a diligent junior dev, write a massive `attack()` method with 50 if-else statements checking `hero.weaponType`. The code is a mess.",
            solution: "Instead of the Hero knowing HOW to attack with every weapon, we separate the behavior into its own class. The Hero just holds a `WeaponBehavior` interface and calls `useWeapon()`.",
            dialogue: "\"If you hardcode the behaviors, you're married to them. Use Strategy to cheat on your implementations with other better implementations anytime you want.\""
        },
        deepDive: {
            reason: "To avoid tight coupling between a context class (Hero) and its algorithms (Weapons).",
            problemDetail: "Inheritance is static; you can't change a subclass's behavior at runtime easily. If you put all logic in one class with if/else, you violate the Open/Closed Principle (modifying tested code for new features). Strategy lets you define a family of algorithms, put each in its own class, and make them interchangeable.",
            keyBenefit: "You can change behavior at runtime (swap sword for bow) without changing the Hero class."
        },
        code: {
            bad: `
class Hero {
    attack() {
        if (this.weapon === 'sword') {
            return "Slash!";
        } else if (this.weapon === 'bow') {
            return "Shoot!";
        }
    }
}
            `,
            good: `
class Hero {
    setWeapon(weapon) { this.weapon = weapon; }
    attack() { return this.weapon.use(); }
}

class Sword { use() { return "Slash!"; } }
class Bow { use() { return "Shoot!"; } }
            `
        },
        useCases: ["Payment strategies", "Sorting algorithms", "Validation logic"],
        demo: { type: "strategy-rpg" }
    },
    {
        id: "observer",
        name: "Observer",
        category: "Behavioral",
        tagline: "Don't Call Us, We'll Call You",
        story: {
            title: "The YouTube Notification Nightmare",
            context: "You're building a video platform. When a creator uploads a video, their subscribers need to know.",
            problem: "The naive approach: The Creator object has a list of every single User object. When `upload()` happens, it manually loops through millions of users. It's slow and rigid.",
            solution: "The Observer pattern! The Creator (Subject) maintains a list of subscriptions. Users (Observers) can subscribe or unsubscribe dynamically.",
            dialogue: "\"Stop polling the database every 5 seconds. Let the driver tell you when you arrive.\""
        },
        deepDive: {
            reason: "To establish a one-to-many dependency without tight coupling.",
            problemDetail: "Without Observer, the subject (YouTube Channel) would need to know the exact details of every observer (User, EmailService, PushNotif). This creates a dependency cycle and hard-to-maintain code. Polling ('Are you done yet?') wastes resources. Observer inverts this: the subject just notifies, and doesn't care who is listening.",
            keyBenefit: "The subject doesn't need to know anything about the observers other than that they implement an update method."
        },
        code: {
            bad: `
class Channel {
    upload() {
        user1.notify();
        user2.notify();
        // Hardcoded dependency!
    }
}
            `,
            good: `
class Channel {
    subscribe(fn) { this.subs.push(fn); }
    upload(msg) { 
        this.subs.forEach(s => s(msg)); 
    }
}
            `
        },
        useCases: ["Event listeners", "Redux/State management", "Pub/Sub systems"],
        demo: { type: "observer-youtube" }
    },
    {
        id: "command",
        name: "Command",
        category: "Behavioral",
        tagline: "Order Up!",
        story: {
            title: "The Diner Short-Order Cook",
            context: "You are at a diner. You (Client) give an order to the Waiter (Invoker). The Waiter gives the order to the Cook (Receiver).",
            problem: "If you shouted orders directly at the cook, he'd get overwhelmed. Also, you couldn't undo an order or schedule it for later.",
            solution: "Turn the request into an object! An `Order` object. Now the waiter can take the `Order` object, queue it, log it, or even undo it.",
            dialogue: "\"Encapsulate a request as an object. This lets you parameterize clients with different requests, queue or log requests, and support undoable operations.\""
        },
        deepDive: {
            reason: "To decouple the object that invokes the operation from the one that knows how to perform it.",
            problemDetail: "In UI systems, a Button shouldn't need to know the details of business logic (like 'Light.turnOn()'). It just needs to know 'execute()'. If you direct couple them, you can't easily implement Undo/Redo or Macro (batch) operations because the logic is hard-coded in the UI event handler.",
            keyBenefit: "You can treat a method call as an object, allowing you to pass it around, store it, undo it, or queue it."
        },
        code: {
            bad: `
function btnClick() {
    // Direct tight coupling
    light.turnOn(); 
    // What if I want to undo this?
    // What if I want to delay this?
}
            `,
            good: `
class TurnOnCommand {
    constructor(light) { this.light = light; }
    execute() { this.light.turnOn(); }
    undo() { this.light.turnOff(); }
}

const command = new TurnOnCommand(light);
remote.setCommand(command);
remote.pressButton(); // Executes
            `
        },
        useCases: ["GUI Buttons", "Undo/Redo functionality", "Job queues"],
        demo: { type: "command-remote" }
    },
    {
        id: "state",
        name: "State",
        category: "Behavioral",
        tagline: "Mood Swings for Objects",
        story: {
            title: "The Bipolar Vending Machine",
            context: "A vending machine has states: 'Idle', 'HasQuarter', 'SoldOut', 'Dispensing'.",
            problem: "You write a massive switch statement: `if (state === 'Idle') insertCoin()`. It becomes a spaghetti monster of conditional logic.",
            solution: "Make each state a class (`IdleState`, `HasQuarterState`). The Vending Machine delegates the work to the current state object.",
            dialogue: "\"Allow an object to alter its behavior when its internal state changes. The object will appear to change its class.\""
        },
        deepDive: {
            reason: "To eliminate massive conditional (switch/if) statements related to object state.",
            problemDetail: "When an object has complex behavior depending on its state, monolithic classes become unmaintainable (e.g., a Document that behaves differently when Draft vs Published). Adding a new state requires changing every method in the class. State pattern distributes this logic into separate classes.",
            keyBenefit: "New states can be added without changing existing state classes (Open/Closed Principle)."
        },
        code: {
            bad: `
class VendingMachine {
    insertQuarter() {
        if (this.state === 'sold_out') {
            console.log("No.");
        } else if (this.state === 'has_quarter') {
            console.log("Already have one.");
        }
        // ... endless complexity
    }
}
            `,
            good: `
class VendingMachine {
    setState(state) { this.state = state; }
    insertQuarter() { this.state.insertQuarter(); }
}

class NoQuarterState {
    insertQuarter() { 
        console.log("You inserted a quarter.");
        machine.setState(hasQuarterState);
    }
}
            `
        },
        useCases: ["Game Character States (Jump vs Duck)", "Order Processing workflow", "TCP Connection states"],
        demo: { type: "state-vending" }
    },
    {
        id: "template",
        name: "Template Method",
        category: "Behavioral",
        tagline: "The Recipe for Success",
        story: {
            title: "The Caffeine Addiction",
            context: "Making Coffee and Tea is similar: Boil water, brew, pour in cup, add condiments.",
            problem: "You have two classes `Coffee` and `Tea` with duplicated code for 'boilWaiting' and 'pourInCup'.",
            solution: "Define the skeleton of the algorithm in a base class method `prepareRecipe()`. Let subclasses override specific steps like `brew()` and `addCondiments()`.",
            dialogue: "\"Don't call us, we'll call you... specifically, the Hollywood Principle. The high-level component controls the algorithm, low-level components just fill in the blanks.\""
        },
        deepDive: {
            reason: "To reuse code for the invariant parts of an algorithm while leaving the variant parts to subclasses.",
            problemDetail: "Duplication of code is the root of all evil. If two algorithms are 90% identical, copy-pasting is dangerous. You want to define the 'structure' of the algorithm in one place (the Template) and enforce that structure, while letting subclasses provide the specific details for certain steps.",
            keyBenefit: "Enforces the structure of an algorithm while allowing flexibility in implementation details."
        },
        code: {
            bad: `
class Coffee {
    make() {
        boilWater();
        brewCoffee(); // Different
        pour();
        addMilk(); // Different
    }
}
class Tea {
    make() {
        boilWater(); 
        steepTea(); // Different
        pour();
        addLemon(); // Different
    }
}
            `,
            good: `
class CaffeineBeverage {
    prepare() {
        this.boilWater();
        this.brew(); // Abstract
        this.pour();
        this.addCondiments(); // Abstract
    }
}
            `
        },
        useCases: ["Data parsing frameworks", "React Component Lifecycle", "Build scripts"],
        demo: { type: "template-barista" }
    },
    {
        id: "iterator",
        name: "Iterator",
        category: "Behavioral",
        tagline: "Just One More Thing...",
        story: {
            title: "The Diner Menu Merger",
            context: "A Pancake House uses an `ArrayList` for their menu. A Diner uses an `Array`. You need to print all items.",
            problem: "You have to write two different loops. If one changes to a `HashMap`, your code breaks.",
            solution: "Encapsulate the iteration logic. Create an `Iterator` interface with `hasNext()` and `next()`. Now you can loop through ANYTHING without caring how the data is stored.",
            dialogue: "\"Provide a way to access the elements of an aggregate object sequentially without exposing its underlying representation.\""
        },
        deepDive: {
            reason: "To traverse a collection without knowing its underlying structure (Array, List, Tree).",
            problemDetail: "If client code needs to know whether a collection is an Array or a Linked List to loop through it, the client is coupled to the implementation. Changing the collection type breaks the client. Iterator provides a uniform interface (`next()`) for traversal.",
            keyBenefit: "Supports multiple traversal algorithms (forward, backward, depth-first) without changing the collection."
        },
        code: {
            bad: `
// Looping array
for (let i = 0; i < menu.length; i++) { ... }

// Looping list
for (let i = 0; i < list.size(); i++) { ... }

// Looping Map? Different again.
            `,
            good: `
const iterator = menu.createIterator();

while(iterator.hasNext()) {
    const item = iterator.next();
    console.log(item);
}
// Works for Array, List, Map, Tree...
            `
        },
        useCases: ["Databases Cursors", "File system traversal", "Media playlists"],
        demo: { type: "iterator-playlist" }
    },

    // --- STRUCTURAL PATTERNS ---
    {
        id: "decorator",
        name: "Decorator",
        category: "Structural",
        tagline: "Wrap It Up",
        story: {
            title: "The Infinite Coffee Menu",
            context: "You have a `Coffee` class. Customers want Milk, Sugar, Whip, Soy, Moose Tracks...",
            problem: "Creating `CoffeeWithMilkAndSugarAndWhip` classes leads to class explosion.",
            solution: "Wrap the Coffee object in a Milk object, then a Sugar object. The system just sees the outer wrapper.",
            dialogue: "\"Attach additional responsibilities to an object dynamically. Decorators provide a flexible alternative to subclassing for extending functionality.\""
        },
        deepDive: {
            reason: "To add responsibilities to individual objects dynamically and transparently.",
            problemDetail: "Inheritance is static and applies to the entire class. If you want to add a border to *just one* window, inheritance forces you to make a new class `BorderedWindow`. If you want a `ScrollableBorderedWindow`, it gets worse. Decorator lets you stack behaviors at runtime by wrapping objects.",
            keyBenefit: "Avoids class explosion and allows mixing and matching behaviors at runtime."
        },
        code: {
            bad: `
class MilkAndSugarCoffee extends Coffee { ... }
class WhipAndSoyCoffee extends Coffee { ... }
// 1000 combinations later...
            `,
            good: `
let coffee = new SimpleCoffee();
coffee = new Milk(coffee);
coffee = new Sugar(coffee);
console.log(coffee.cost());
            `
        },
        useCases: ["Input Streams (Java I/O)", "React Higher Order Components", "Middleware"],
        demo: { type: "decorator-coffee" }
    },
    {
        id: "adapter",
        name: "Adapter",
        category: "Structural",
        tagline: "Square Peg, Round Hole",
        story: {
            title: "The European Travel Charger",
            context: "You are from the US (110V flat plug). You travel to Europe (220V round socket).",
            problem: "Your plug doesn't fit the wall. You can't change the wall, and you can't change your laptop.",
            solution: "Use an Adapter! It translates the interface of the wall to the interface your laptop expects.",
            dialogue: "\"Convert the interface of a class into another interface the clients expect. Adapter lets classes work together that couldn't otherwise because of incompatible interfaces.\""
        },
        deepDive: {
            reason: "To allow incompatible interfaces to work together.",
            problemDetail: "Often you use a 3rd party library or legacy code that has a useful class, but its interface doesn't match what your application expects. You can't change the library code. Adapter creates a middle-man that translates calls.",
            keyBenefit: "Promotes reusability of existing unrelated classes."
        },
        code: {
            bad: `
// Client expects:
target.request();

// Service has:
adaptee.specificRequest();

// ERROR: target.request is not a function
            `,
            good: `
class Adapter {
    constructor(adaptee) {
        this.adaptee = adaptee;
    }
    request() {
        // Translation happens here
        return this.adaptee.specificRequest();
    }
}
            `
        },
        useCases: ["Legacy code integration", "Third-party libraries", "Data format conversion (XML to JSON)"],
        demo: { type: "adapter-plug" }
    },
    {
        id: "facade",
        name: "Facade",
        category: "Structural",
        tagline: "The Simple Front",
        story: {
            title: "The Home Theater Nightmare",
            context: "To watch a movie: Turn on TV, set input to HDMI, turn on Amp, set Amp to DVD, lower lights, turn on Popcorn maker, play DVD.",
            problem: "That's 10 method calls on 5 different objects. If you forget one, it fails.",
            solution: "Create a `HomeTheaterFacade` with a method `watchMovie()`. It does all the hard work for you.",
            dialogue: "\"Provide a unified interface to a set of interfaces in a subsystem. Facade defines a higher-level interface that makes the subsystem easier to use.\""
        },
        deepDive: {
            reason: "To provide a simplified interface to a complex library, a framework, or a complex set of classes.",
            problemDetail: "Complex subsystems have many classes with many methods. Clients that interact directly with these low-level classes become tightly coupled to them and hard to test. Facade hides this complexity behind a 'one-button' interface.",
            keyBenefit: "Decouples the client from the complex subsystem components."
        },
        code: {
            bad: `
tv.on();
tv.setInput('DVD');
amp.on();
amp.setVolume(5);
dvd.on();
dvd.play();
// Client does all this every time
            `,
            good: `
class HomeTheaterFacade {
    watchMovie() {
        this.tv.on();
        this.amp.on();
        this.dvd.play();
    }
}
homeTheater.watchMovie();
            `
        },
        useCases: ["Simplifying complex APIs", "jQuery (hides DOM complexity)", "Microservices gateways"],
        demo: { type: "facade-theater" }
    },
    {
        id: "proxy",
        name: "Proxy",
        category: "Structural",
        tagline: "The Gatekeeper",
        story: {
            title: "The Internet Bouncer",
            context: "You have a `ReallyExpensiveObject` that creates a massive image file.",
            problem: "You don't want to load it until the user actually looks at it. Or maybe you want to block access if the user isn't admin.",
            solution: "Use a Proxy. It looks like the real object, but it sits in front. It can handle lazy loading, access control, or logging.",
            dialogue: "\"Provide a surrogate or placeholder for another object to control access to it.\""
        },
        deepDive: {
            reason: "To control access to an object.",
            problemDetail: "Sometimes you need to intercept messages to an object before they get there. Maybe the object is on a remote server (Remote Proxy), is expensive to create (Virtual Proxy), or needs security (Protection Proxy). Using a proxy allows you to add this logic transparently.",
            keyBenefit: "Adds a layer of security or optimization without changing the real object's code."
        },
        code: {
            bad: `
// Image loads immediately, freezing UI
const img = new MassiveImage("pic.jpg"); 
img.display();
            `,
            good: `
class ProxyImage {
    display() {
        if (!this.realImage) {
            this.realImage = new MassiveImage();
        }
        this.realImage.display();
    }
}
            `
        },
        useCases: ["Lazy Loading", "Access Control (Protection Proxy)", "Logging/Caching"],
        demo: { type: "proxy-vault" }
    },
    {
        id: "composite",
        name: "Composite",
        category: "Structural",
        tagline: "The Tree of Life",
        story: {
            title: "The Menu & Sub-Menu Problem",
            context: "You have a Menu. Sometimes a Menu Item is just a leaf (Pancake). Sometimes it's a whole other Menu (Dessert Menu).",
            problem: "How do you treat them the same? You want to just call `print()` on the top level and have it print everything.",
            solution: "Compose objects into tree structures to represent part-whole hierarchies. Composite lets clients treat individual objects and compositions of objects uniformly.",
            dialogue: "\"Menus, Filesystems, GUI elements... anything that is a container of items that can also be containers.\""
        },
        deepDive: {
            reason: "To treat a group of objects the same way as a single instance of an object.",
            problemDetail: "In a tree structure (like a filesystem), you shouldn't have to check `if (node.isFolder)` to know if you can add a child or how to display it. You want to treat a File and a Folder uniformly. Composite allows you to build a recursive structure where the client code is simple.",
            keyBenefit: "Simplifies client code that has to deal with tree structures."
        },
        code: {
            bad: `
if (item instanceof Menu) {
    // iterate
} else {
    // print
}
// Recursive logic scattered everywhere
            `,
            good: `
class MenuComponent {
    print() { throw "Not impl"; }
}

// Works for both Leaf and Node
topMenu.add(pancakeHouseMenu);
topMenu.add(dinerMenu);
topMenu.print(); 
// recursively prints everything
            `
        },
        useCases: ["DOM Trees", "File Systems", "Organization Charts"],
        demo: { type: "composite-files" }
    },

    // --- CREATIONAL PATTERNS ---
    {
        id: "singleton",
        name: "Singleton",
        category: "Creational",
        tagline: "There Can Be Only One",
        story: {
            title: "The Database Dictator",
            context: "A database connection is expensive. You don't want 50 of them.",
            problem: "How do you ensure only ONE instance of the database class exists?",
            solution: "Private constructor + Static method. If instance exists, return it. If not, create it.",
            dialogue: "\"Ensure a class has only one instance, and provide a global point of access to it.\""
        },
        deepDive: {
            reason: "To strictly control how many instances of a class exist (usually exactly one).",
            problemDetail: "Some resources are shared by nature: logging services, print spoolers, database connections. If you create multiple instances, you risk data corruption or resource exhaustion. Passing the same instance around manually is tedious.",
            keyBenefit: "Guaranteed control over the instance count and a global access point."
        },
        code: {
            bad: `
const db1 = new DB();
const db2 = new DB();
// db1 !== db2
            `,
            good: `
class DB {
    static getInstance() {
        if (!DB.instance) DB.instance = new DB();
        return DB.instance;
    }
}
// Always returns the same object
            `
        },
        useCases: ["Config", "Logging", "Database Connections"],
        demo: { type: "singleton-db" }
    },
    {
        id: "factory",
        name: "Factory Method",
        category: "Creational",
        tagline: "Let the Subclass Decide",
        story: {
            title: "The Logistics Manager",
            context: "You have a delivery app. Starts with Trucks.",
            problem: "Now you need Ships. The `new Truck()` calls are everywhere.",
            solution: "Define an interface for creating an object, but let subclasses decide which class to instantiate.",
            dialogue: "\"Encapsulate object creation. Decouple the client code from the concrete classes it needs to instantiate.\""
        },
        deepDive: {
            reason: "To allow a class to defer instantiation to subclasses.",
            problemDetail: "If you call `new ConcreteClass()` in your code, you are tightly coupled to that specific class. If you want to switch to a different class later, you have to find/replace all `new` calls. Factory Method creates a 'hook' for subclasses to decide WHAT is created, so the base code just uses the interface.",
            keyBenefit: "Eliminates the need to bind application-specific classes into your code."
        },
        code: {
            bad: `
if (type === 'sea') return new Ship();
else if (type === 'road') return new Truck();
            `,
            good: `
class Logistics {
    createTransport() {} // Abstract
}
class SeaLogistics extends Logistics {
    createTransport() { return new Ship(); }
}
            `
        },
        useCases: ["Cross-platform UI", "Plugin systems", "Parsers"],
        demo: { type: "factory-transport" }
    },
    {
        id: "builder",
        name: "Builder",
        category: "Creational",
        tagline: "Have It Your Way",
        story: {
            title: "The Subway Sandwich Artist",
            context: "A generic sandwich class is hard. Sandwich(bread, meat, cheese, mayo, mustard, lettuce, tomato...).",
            problem: "Constructor insanity. `new Sandwich('wheat', null, 'cheddar', true, false, true...)`",
            solution: "Separate the construction of a complex object from its representation. A 'Builder' object lets you chain methods.",
            dialogue: "\"Encapsulate the construction logic. Fluent interfaces are often used here: `artist.addCheese().addTomato().build()`.\""
        },
        deepDive: {
            reason: "To construct complex objects step by step.",
            problemDetail: "When an object has a constructor with 10 optional parameters, it becomes a nightmare to read and write (the 'Telescoping Constructor' problem). Builder separates the construction process, allowing you to create the object in stages and only set what you need.",
            keyBenefit: "Complete control over the construction process and readable client code."
        },
        code: {
            bad: `
const s = new Sandwich("wheat", "turkey", "cheddar", true, false, true, false);
// What does 'true' mean?
            `,
            good: `
const s = new SandwichBuilder()
    .setBread("wheat")
    .setMeat("turkey")
    .addVeggie("lettuce")
    .build();
            `
        },
        useCases: ["SQL Query Builders", "Complex Configurations", "Document Generation"],
        demo: { type: "builder-robot" }
    },
    {
        id: "prototype",
        name: "Prototype",
        category: "Creational",
        tagline: "Attack of the Clones",
        story: {
            title: "The Dolly Sheep Lab",
            context: "Creating a new object from scratch (database lookup, network call) is expensive.",
            problem: "You need 100 copies of a character that took 5 seconds to configure.",
            solution: "Don't create new ones. Clone an existing one! The Prototype pattern creates new objects by copying an existing instance.",
            dialogue: "\"Specify the kinds of objects to create using a prototypical instance, and create new objects by copying this prototype.\""
        },
        deepDive: {
            reason: "To create new objects by copying an existing object (the prototype).",
            problemDetail: "Sometimes defining a class for every possible configuration of an object is impossible or creating a new instance from scratch is too costly in performance (e.g., parsing a huge file). Cloning a pre-configured object is much faster.",
            keyBenefit: "Adding and removing products at runtime; specifying new objects by varying values; reducing subclassing."
        },
        code: {
            bad: `
// Slow, expensive creation
const sheep1 = new Sheep(db.getData()); 
const sheep2 = new Sheep(db.getData()); 
            `,
            good: `
const original = new Sheep(data);
const clone = original.clone();
            `
        },
        useCases: ["Caching", "Thread pooling", "Game entity spawning"],
        demo: { type: "prototype-clone" }
    }
];
