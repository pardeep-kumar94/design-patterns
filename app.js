document.addEventListener('DOMContentLoaded', () => {
    const patternList = document.getElementById('patternList');
    const contentArea = document.getElementById('contentArea');
    const searchInput = document.getElementById('searchInput');

    // Render Sidebar List
    function renderList(filter = '') {
        patternList.innerHTML = '';
        patternsData.forEach(pattern => {
            if (pattern.name.toLowerCase().includes(filter.toLowerCase()) ||
                pattern.category.toLowerCase().includes(filter.toLowerCase())) {

                const item = document.createElement('div');
                item.className = 'pattern-item';
                item.innerHTML = `
                    <h3>${pattern.name}</h3>
                    <div class="category">${pattern.category}</div>
                `;
                item.addEventListener('click', () => {
                    document.querySelectorAll('.pattern-item').forEach(i => i.classList.remove('active'));
                    item.classList.add('active');
                    loadPattern(pattern);
                });
                patternList.appendChild(item);
            }
        });
    }

    // Search Functionality
    searchInput.addEventListener('input', (e) => {
        renderList(e.target.value);
    });

    // Load Pattern Detail
    function loadPattern(pattern) {
        contentArea.scrollTop = 0;
        const useCasesHtml = pattern.useCases.map(uc => `<li>${uc}</li>`).join('');

        contentArea.innerHTML = `
            <div class="pattern-detail">
                <div class="pattern-header">
                    <span class="pattern-tag">${pattern.category} Pattern</span>
                    <h1>${pattern.name}</h1>
                    <p class="story-text" style="font-size: 1.5rem; color: var(--text-primary);">${pattern.tagline}</p>
                </div>

                <div class="section-card">
                    <div class="section-title">
                        <span>📖</span>
                        <h3>The Story: ${pattern.story.title}</h3>
                    </div>
                    <div class="story-text">
                        <p><strong>Context:</strong> ${pattern.story.context}</p>
                        <br>
                        <p><strong>The Pain:</strong> ${pattern.story.problem}</p>
                        <br>
                        <p><strong>The Fix:</strong> ${pattern.story.solution}</p>
                    </div>
                    <div class="story-dialogue">
                        <strong>CTO says:</strong> ${pattern.story.dialogue}
                    </div>
                </div>

                <div class="section-card" style="border: 1px solid var(--accent); background: rgba(59, 130, 246, 0.05);">
                    <div class="section-title">
                        <span style="font-size: 1.5rem;">🧐</span>
                        <h3 style="color: var(--accent);">Deep Dive: The "Why"</h3>
                    </div>
                    <div class="story-text">
                        <p style="margin-bottom: 1rem;"><strong style="color: var(--text-primary);">Reason to exist:</strong> ${pattern.deepDive.reason}</p>
                        <p style="margin-bottom: 1rem;"><strong style="color: var(--text-primary);">The Root Problem:</strong> ${pattern.deepDive.problemDetail}</p>
                        <p><strong style="color: var(--success);">Key Benefit:</strong> ${pattern.deepDive.keyBenefit}</p>
                    </div>
                </div>

                <div class="section-card">
                    <div class="section-title">
                        <span>💻</span>
                        <h3>Code: The Good, The Bad, and The Ugly</h3>
                    </div>
                    <div class="comparison-grid">
                        <div>
                            <div class="bad-code-header">❌ Without Pattern</div>
                            <pre class="code-block bad-code"><code>${pattern.code.bad.trim()}</code></pre>
                        </div>
                        <div>
                            <div class="good-code-header">✅ With ${pattern.name}</div>
                            <pre class="code-block good-code"><code>${pattern.code.good.trim()}</code></pre>
                        </div>
                    </div>
                </div>

                <div class="section-card">
                    <div class="section-title">
                        <span>🎯</span>
                        <h3>When to use this?</h3>
                    </div>
                    <ul class="use-case-list">
                        ${useCasesHtml}
                    </ul>
                </div>

                <div class="section-card">
                    <div class="section-title">
                        <span>🎮</span>
                        <h3>Interactive Demo</h3>
                    </div>
                    <div id="demo-container"></div>
                </div>
            </div>
        `;

        mountDemo(pattern.demo.type, document.getElementById('demo-container'));
    }

    // Interactive Demos Logic
    function mountDemo(type, container) {
        // --- Strategy ---
        if (type === 'strategy-rpg') {
            container.innerHTML = `
                <div class="interactive-demo">
                    <p>Current Weapon: <strong id="weapon-display">Fists</strong></p>
                    <div class="demo-controls">
                        <button onclick="setWeapon('sword')">Equip Sword</button>
                        <button onclick="setWeapon('bow')">Equip Bow</button>
                        <button onclick="setWeapon('magic')">Equip Staff</button>
                    </div>
                    <div class="demo-controls">
                         <button onclick="performAttack()" style="background-color: var(--success)">ATTACK!</button>
                    </div>
                    <div id="demo-output" class="demo-output">Select a weapon...</div>
                </div>
            `;
            window.currentStrategy = { use: () => "You punch the air. Weak." };
            window.setWeapon = (w) => {
                const d = document.getElementById('weapon-display');
                if (w === 'sword') { window.currentStrategy.use = () => "⚔️ Slash! (10 dmg)"; d.innerText = "Sword"; }
                if (w === 'bow') { window.currentStrategy.use = () => "🏹 Thwack! (8 dmg)"; d.innerText = "Bow"; }
                if (w === 'magic') { window.currentStrategy.use = () => "🔥 Fireball! (15 dmg)"; d.innerText = "Magic"; }
                document.getElementById('demo-output').innerText = `Equipped ${w}`;
            };
            window.performAttack = () => document.getElementById('demo-output').innerText = window.currentStrategy.use();
        }
        // --- Observer ---
        else if (type === 'observer-youtube') {
            container.innerHTML = `
                <div class="interactive-demo">
                    <div class="demo-controls">
                        <button onclick="addSubscriber()">Add Subscriber</button>
                         <button onclick="notifySubscribers()" style="background-color: var(--warning)">Upload Video!</button>
                    </div>
                    <div id="sub-list" style="margin: 1rem 0;">Subscribers: 0</div>
                    <div id="demo-output" class="demo-output">Waiting...</div>
                </div>
            `;
            window.subs = [];
            window.addSubscriber = () => {
                window.subs.push(window.subs.length + 1);
                document.getElementById('sub-list').innerText = `Subscribers: ${window.subs.length}`;
            };
            window.notifySubscribers = () => {
                if (window.subs.length === 0) { document.getElementById('demo-output').innerText = "No subscribers!"; return; }
                document.getElementById('demo-output').innerText = window.subs.map(i => `User ${i} pinged!`).join('\n');
            };
        }
        // --- Decorator ---
        else if (type === 'decorator-coffee') {
            container.innerHTML = `
                <div class="interactive-demo">
                    <p>Order: <strong id="coffee-display">Coffee ($5)</strong></p>
                    <div class="demo-controls">
                        <button onclick="addCondiment('Milk', 2)">+ Milk ($2)</button>
                        <button onclick="addCondiment('Sugar', 1)">+ Sugar ($1)</button>
                        <button onclick="addCondiment('Whip', 3)">+ Whip ($3)</button>
                        <button onclick="resetCoffee()" style="background-color: var(--danger)">Reset</button>
                    </div>
                </div>
            `;
            window.coffee = { desc: "Coffee", cost: 5 };
            window.addCondiment = (n, c) => {
                window.coffee.desc += " + " + n;
                window.coffee.cost += c;
                document.getElementById('coffee-display').innerText = `${window.coffee.desc} ($${window.coffee.cost})`;
            };
            window.resetCoffee = () => {
                window.coffee = { desc: "Coffee", cost: 5 };
                document.getElementById('coffee-display').innerText = "Coffee ($5)";
            };
        }
        // --- Singleton ---
        else if (type === 'singleton-db') {
            container.innerHTML = `
                <div class="interactive-demo">
                    <p>Database Instance ID: <strong id="db-id">None</strong></p>
                    <div class="demo-controls">
                        <button onclick="getDBInstance()">Get Instance</button>
                        <button onclick="tryNewDBInstance()">Atomic Try Create New</button>
                    </div>
                    <div id="demo-output" class="demo-output">Start by getting an instance.</div>
                </div>
            `;
            window.dbInstance = null;
            window.getDBInstance = () => {
                if (!window.dbInstance) window.dbInstance = Math.floor(Math.random() * 10000);
                document.getElementById('db-id').innerText = window.dbInstance;
                document.getElementById('demo-output').innerText = "Returned existing instance.";
            }
            window.tryNewDBInstance = () => {
                if (!window.dbInstance) {
                    window.getDBInstance();
                } else {
                    document.getElementById('demo-output').innerText = `BLOCKED! Already have instance ${window.dbInstance}. Cannot create another.`;
                }
            }
        }
        // --- Factory ---
        else if (type === 'factory-transport') {
            container.innerHTML = `
                <div class="interactive-demo">
                    <div class="demo-controls">
                        <button onclick="createTransport('road')">Order via Road</button>
                        <button onclick="createTransport('sea')">Order via Sea</button>
                    </div>
                    <div id="demo-output" class="demo-output" style="font-size: 3rem;">🚚</div>
                </div>
            `;
            window.createTransport = (type) => {
                const out = document.getElementById('demo-output');
                if (type === 'road') out.innerText = "🚚 Truck Created";
                if (type === 'sea') out.innerText = "🚢 Ship Created";
            }
        }
        // --- Command ---
        else if (type === 'command-remote') {
            container.innerHTML = `
                <div class="interactive-demo">
                    <p>Commands Queue: <span id="cmd-queue">0</span></p>
                    <div class="demo-controls">
                        <button onclick="addCommand('Light On')">Light On</button>
                        <button onclick="addCommand('Fan On')">Fan On</button>
                        <button onclick="executeCommands()" style="background-color: var(--success)">Execute All</button>
                        <button onclick="undoLast()" style="background-color: var(--warning)">Undo Last</button>
                    </div>
                    <div id="demo-output" class="demo-output">Ready</div>
                </div>
            `;
            window.commands = [];
            window.addCommand = (c) => {
                window.commands.push(c);
                document.getElementById('cmd-queue').innerText = window.commands.length;
                document.getElementById('demo-output').innerText = `Queued: ${c}`;
            }
            window.executeCommands = () => {
                if (window.commands.length === 0) return;
                document.getElementById('demo-output').innerText = `Executing: ${window.commands.join(', ')}`;
                window.commands = [];
                document.getElementById('cmd-queue').innerText = 0;
            }
            window.undoLast = () => {
                const c = window.commands.pop();
                document.getElementById('cmd-queue').innerText = window.commands.length;
                document.getElementById('demo-output').innerText = c ? `Undid: ${c}` : "Nothing to undo";
            }
        }
        // --- State ---
        else if (type === 'state-vending') {
            container.innerHTML = `
                <div class="interactive-demo">
                    <p>State: <strong id="v-state">Idle</strong></p>
                    <div class="demo-controls">
                        <button onclick="insertCoin()">Insert Coin</button>
                        <button onclick="pressButton()">Press Button</button>
                        <button onclick="dispense()">Dispense</button>
                    </div>
                    <div id="demo-output" class="demo-output">Machine is idle.</div>
                </div>
            `;
            window.vState = 'Idle';
            window.insertCoin = () => {
                if (window.vState === 'Idle') { window.vState = 'HasCoin'; msg = "Coin accepted."; }
                else if (window.vState === 'HasCoin') msg = "Already have coin!";
                else msg = "Wait, dispensing...";
                updateVending(msg);
            }
            window.pressButton = () => {
                if (window.vState === 'HasCoin') { window.vState = 'Dispensing'; msg = "Button pressed..."; setTimeout(window.dispense, 1000); }
                else if (window.vState === 'Idle') msg = "Insert coin first.";
                else msg = "Already processing.";
                updateVending(msg);
            }
            window.dispense = () => {
                if (window.vState === 'Dispensing') { window.vState = 'Idle'; msg = "Here is your soda! 🥤"; }
                else msg = "Nothing to dispense.";
                updateVending(msg);
            }
            function updateVending(msg) {
                document.getElementById('v-state').innerText = window.vState;
                document.getElementById('demo-output').innerText = msg;
            }
        }
        // --- Adapter ---
        else if (type === 'adapter-plug') {
            container.innerHTML = `
                <div class="interactive-demo">
                    <div class="demo-controls">
                        <button onclick="plugIn('US')">Plug US Device</button>
                        <button onclick="plugIn('EU')">Plug EU Device</button>
                    </div>
                    <div id="demo-output" class="demo-output">Wall Socket: EU (220V)</div>
                </div>
            `;
            window.plugIn = (type) => {
                const out = document.getElementById('demo-output');
                if (type === 'EU') out.innerText = "✅ Fits perfectly!";
                else out.innerText = "❌ Can't fit! You need an Adapter.";

                if (type === 'US') {
                    setTimeout(() => out.innerText += "\nAttaching Adapter...\n✅ Now it fits!", 800);
                }
            }
        }
        // --- Builder ---
        else if (type === 'builder-robot') {
            container.innerHTML = `
                <div class="interactive-demo">
                    <p>Robot: <span id="robot-parts">Head</span></p>
                    <div class="demo-controls">
                        <button onclick="addPart('Arms')">+ Arms</button>
                        <button onclick="addPart('Legs')">+ Legs</button>
                        <button onclick="addPart('Lasers')">+ Lasers</button>
                        <button onclick="buildRobot()" style="background-color: var(--success)">Build!</button>
                    </div>
                    <div id="demo-output" class="demo-output">Constructing...</div>
                </div>
            `;
            window.parts = ['Head'];
            window.addPart = (p) => { window.parts.push(p); document.getElementById('robot-parts').innerText = window.parts.join(' - '); }
            window.buildRobot = () => { document.getElementById('demo-output').innerText = `🤖 Robot Created with: ${window.parts.join(', ')}`; window.parts = ['Head']; }
        }
        // --- Generic Fallback ---
        else {
            container.innerHTML = `
                <div class="interactive-demo">
                    <p>Interactive simulation for <strong>${type}</strong></p>
                    <div class="demo-controls">
                         <button onclick="runGenericDemo()">Run Simulation</button>
                    </div>
                    <div id="generic-output" class="demo-output">Ready to simulate pattern logic...</div>
                </div>
            `;
            window.runGenericDemo = () => {
                const outputs = [
                    "Initializing system components...",
                    "Applying pattern logic...",
                    "Decoupling dependencies...",
                    "Optimizing interaction...",
                    "Success! Pattern applied correctly."
                ];
                let i = 0;
                const out = document.getElementById('generic-output');
                const interval = setInterval(() => {
                    out.innerText = outputs[i];
                    i++;
                    if (i >= outputs.length) clearInterval(interval);
                }, 600);
            }
        }
    }

    // Initialize
    renderList();
});
