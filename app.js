// COOKIE COUNTERS & LOG GAMEPLAY STATISTICS
// Keeps track of all cookies baked during gameplay
let cookiesPerSecond = 0
let spendableCookies = 0
let spentCookies = 0
let totalCookiesMade = 0
let gameplayTime = 0 // Gameplay time elapsed, counted in seconds

// Intervals for accurate stats
setInterval(function() {
    totalCookiesMade = spendableCookies + spentCookies
}, 1)

setInterval(function() {
    gameplayTime++
}, 1000)




// MAIN COUNTER - spendableCookies
// Current amount of cookies the player has in their "pantry"
// Can be spent on upgrades

// Abbreviates the value of spendableCookies displayed.
// Mainly to stop the the counter from flickering due to text length at extremely high amounts.
let abbrvSpendableCookies = ""

function abbrvThoseCookies() {
    abbrvSpendableCookies = spendableCookies
    if (spendableCookies >= 1e15) {
        abbrvSpendableCookies = (spendableCookies / 1e15).toFixed(1) + " quadrillion"
    } else if (spendableCookies >= 1e12) {
        abbrvSpendableCookies = (spendableCookies / 1e12).toFixed(1) + " trillion"
    } else if (spendableCookies >= 1e9) {
        abbrvSpendableCookies = (spendableCookies / 1e9).toFixed(1) + " billion"
    } else if (spendableCookies >= 1e6) {
        abbrvSpendableCookies = (spendableCookies / 1e6).toFixed(1) + " million"
    }
    return abbrvSpendableCookies
}
setInterval(abbrvThoseCookies, 1)


const cookieCount = document.getElementById("cookie-count")

// Changes the text depending on CPS value
function updateSpendableCookieDisplay() {
    if (spendableCookies > 1 || spendableCookies <= 0 || spendableCookies == null) {
        cookieCount.innerText = `${abbrvSpendableCookies} cookies!`
    } else if (spendableCookies == 1) {
        cookieCount.innerText = `${abbrvSpendableCookies} cookie!`
    }
    
}


// Required to get the value loaded from memory to display immediately upon page load
setTimeout(updateSpendableCookieDisplay, 1)
setInterval(updateSpendableCookieDisplay, 1)




// FOR TEST PURPOSES ONLY
// For testing things are working correctly
// COMMENT OUT IN FINAL VER. ALONG WITH RELATED HTML CODE.
// const spendCookies = document.getElementById("spend-cookies")
// spendCookies.addEventListener("click", function() {
//     spendableCookies -= 100000
//     updateSpendableCookieDisplay()
//     spentCookies += 100000
//     totalCookiesMade = spentCookies + spendableCookies
// })

// const addCookies = document.getElementById("add-cookies")
// addCookies.addEventListener("click", function() {
//     spendableCookies += 100000000000
//     updateSpendableCookieDisplay()
//     totalCookiesMade = spentCookies + spendableCookies
// })






// UPGRADES & UPGRADE SHOP
// Defines the amount bought of each upgrade
let upgrade1Amount = 0
let upgrade2Amount = 0
let upgrade3Amount = 0
let upgrade4Amount = 0
let upgrade5Amount = 0
let upgrade6Amount = 0
let upgrade7Amount = 0
let upgrade8Amount = 0
let upgrade9Amount = 0
let upgrade10Amount = 0

// Determines the multipliers on upgrades
function upgradeMultipliers() {
    cookiesPerSecond = (upgrade1Amount * 1) +
                        (upgrade2Amount * 5) +
                        (upgrade3Amount * 10) +
                        (upgrade4Amount * 20) +
                        (upgrade5Amount * 50) +
                        (upgrade6Amount * 100) +
                        (upgrade7Amount * 200) +
                        (upgrade8Amount * 500) +
                        (upgrade9Amount * 1000) +
                        (upgrade10Amount * 2000)
    spendableCookies += cookiesPerSecond // Increases spendable cookies according to CPS
}

// Add to cookie count every second
setInterval(upgradeMultipliers, 1000)

// NOT ENOUGH COOKIES ALERT
// To appear if the player attempts to buy something more expensive than they can afford
function notEnough() {
    alert("You don't have enough cookies to purchase this upgrade!")
}

// Fetching the API
async function fetchUpgrades() {
    const response = await fetch("https://cookie-upgrade-api.vercel.app/api/upgrades")
    // const response = await fetch("./placeholders/api.txt") // Offline placeholder
    upgrades = await response.json()
    return upgrades
}

let upgradeShop = document.getElementById("upgrade-shop")

async function displayUpgradeShop() {
    const upgrades = await fetchUpgrades()
    upgrades.forEach(function(upgrades) {
        let button = document.createElement("a") // Creates the button
        button.classList.add("upgrade-box")
        button.classList.add("pointer") // Class for pointer-style cursor on mouseover (in CSS)
        button.id = `upgrade-${upgrades.id}`
        let name = document.createElement("h3")
        let cost = document.createElement("p")
        let increase = document.createElement("p")
        name.textContent = `${upgrades.name}`
        cost.textContent = `Cost: ${upgrades.cost}`
        increase.textContent = `CPS Increase: ${upgrades.increase}`
        upgradeShop.appendChild(button)
        button.appendChild(name) // Appends it to `button` as a child element
        button.appendChild(cost)
        button.appendChild(increase)
    })
    const upgrade1Event = document.getElementById("upgrade-1")
    upgrade1Event .addEventListener("click", function() {
        if (spendableCookies >= 100) {
            spendableCookies -= 100
            upgrade1Amount++
            updateSpendableCookieDisplay()
            spentCookies += 100
        }
        else {
            notEnough()
        }
        })
    const upgrade2Event = document.getElementById("upgrade-2")
    upgrade2Event .addEventListener("click", function() {
        if (spendableCookies >= 500) {
            spendableCookies -= 500
            upgrade2Amount++
            updateSpendableCookieDisplay()
            spentCookies += 500
        }
        else {
            notEnough()
        }
        })
    const upgrade3Event = document.getElementById("upgrade-3")
    upgrade3Event .addEventListener("click", function() {
        if (spendableCookies >= 1000) {
            spendableCookies -= 1000
            upgrade3Amount++
            updateSpendableCookieDisplay()
            spentCookies += 1000
        }
        else {
            notEnough()
        }
        })
    const upgrade4Event = document.getElementById("upgrade-4")
    upgrade4Event .addEventListener("click", function() {
        if (spendableCookies >= 2000) {
            spendableCookies -= 2000
            upgrade4Amount++
            updateSpendableCookieDisplay()
            spentCookies += 2000
        }
        else {
            notEnough()
        }
        })
    const upgrade5Event = document.getElementById("upgrade-5")
    upgrade5Event.addEventListener("click", function() {
        if (spendableCookies >= 5000) {
            spendableCookies -= 5000
            upgrade5Amount++
            updateSpendableCookieDisplay()
            spentCookies += 5000
        }
        else {
            notEnough()
        }

        })
    const upgrade6Event = document.getElementById("upgrade-6")
    upgrade6Event.addEventListener("click", function() {
        if (spendableCookies >= 10000) {
            spendableCookies -= 10000
            upgrade6Amount++
            updateSpendableCookieDisplay()
            spentCookies += 10000
        }
        else {
            notEnough()
        }

        })
    const upgrade7Event = document.getElementById("upgrade-7")
    upgrade7Event.addEventListener("click", function() {
    if (spendableCookies >= 20000) {
        spendableCookies -= 20000
        upgrade7Amount++
        updateSpendableCookieDisplay()
        spentCookies += 20000
    }
    else {
        notEnough()
    }
    })
    const upgrade8Event = document.getElementById("upgrade-8")
    upgrade8Event.addEventListener("click", function() {
    if (spendableCookies >= 50000) {
        spendableCookies -= 50000
        upgrade8Amount++
        updateSpendableCookieDisplay()
        spentCookies += 50000
    }
    else {
        notEnough()
    }
    })
    const upgrade9Event = document.getElementById("upgrade-9")
    upgrade9Event.addEventListener("click", function() {
    if (spendableCookies >= 100000) {
        spendableCookies -= 100000
        upgrade9Amount++
        updateSpendableCookieDisplay()
        spentCookies += 100000
    }
    else {
        notEnough()
    }
    })
    const upgrade10Event = document.getElementById("upgrade-10")
    upgrade10Event.addEventListener("click", function() {
    if (spendableCookies >= 200000) {
        spendableCookies -= 200000
        upgrade10Amount++
        updateSpendableCookieDisplay()
        spentCookies += 200000
    }
    else {
        notEnough()
    }
    })
}

displayUpgradeShop()



// DISPLAY STATISTICS
// Statistics that dynamically refresh
let currentStatistics = null // Puts the array in the function in global scope

// Making the statistics a function so that we can repeatedly call it to refresh the stats
function refreshStatistics () {
    currentStatistics = [
        {
            spendable: abbrvSpendableCookies,
        },
        {
            spent: spentCookies,
        },
        {
            total: totalCookiesMade,
        },
        {
            CPS: cookiesPerSecond,
        },
        {
            gameTime: gameplayTime,
        },
    ]
}

setTimeout(refreshStatistics, 1)  // Page load
setInterval(refreshStatistics,  1) // Refreshes every second

// Displays statistics in the HTML document
let statisticsBox = document.getElementById("statistics-box")

function displayStatistics() {
    statisticsBox.innerHTML = null // Clears any previously loaded statistics from view
    let spendable = document.createElement("p")
    let spent = document.createElement("p")
    let total = document.createElement("p")
    let gameTime = document.createElement("p")
    let CPS = document.createElement("p")
    spendable.textContent = `Cookies in pantry: ${currentStatistics[0].spendable}`
    spent.textContent = `Cookies spent: ${currentStatistics[1].spent}`
    total.textContent = `Total cookies made: ${currentStatistics[2].total}`
    CPS.textContent = `Current CPS (cookies per second): ${currentStatistics[3].CPS}`
    gameTime.textContent = `Time in-game: ${currentStatistics[4].gameTime} seconds`
    statisticsBox.appendChild(CPS)
    statisticsBox.appendChild(spendable)
    statisticsBox.appendChild(spent)
    statisticsBox.appendChild(total)
    statisticsBox.appendChild(gameTime)
}

setTimeout(displayStatistics, 1)  // Page load
setInterval(displayStatistics,  1) // Display refreshes every second





// UPGRADES OWNED
function refreshUpgradesOwned () {
    const currentUpgradesOwned = [
        {
            name: "Auto-Clicker",
            spendable: upgrade1Amount,
        },
        {
            name: "Enhanced Oven",
            spendable: upgrade2Amount,
        },
        {
            name: "Cookie Farm",
            spendable: upgrade3Amount,
        },
        {
            name: "Robot Baker",
            spendable: upgrade4Amount,
        },
        {
            name: "Cookie Factory",
            spendable: upgrade5Amount,
        },
        {
            name: "Magic Flour",
            spendable: upgrade6Amount,
        },
        {
            name: "Time Machine",
            spendable: upgrade7Amount,
        },
        {
            name: "Quantum Oven",
            spendable: upgrade8Amount,
        },
        {
            name: "Alien Technology",
            spendable: upgrade9Amount,
        },
        {
            name: "Interdimensional Baker",
            spendable: upgrade10Amount,
        },
    ]
    return currentUpgradesOwned
}


setTimeout(refreshUpgradesOwned, 1)  // Page load
setInterval(refreshUpgradesOwned, 1) // Refreshes every second


const upgradesOwnedContainer = document.getElementById("upgrades-owned")

function displayUpgradesOwned() {
    upgradesOwnedContainer.innerHTML = ""
    const upgrades = refreshUpgradesOwned()
    upgrades.forEach(function(upgrade) {
        let upgradeName = document.createElement("p")
        upgradeName.textContent = `${upgrade.name}: ${upgrade.spendable}`
        upgradesOwnedContainer.appendChild(upgradeName)
    })
}


setTimeout(displayUpgradesOwned, 1)  // Page load
setInterval(displayUpgradesOwned, 1) // Display refreshes every second









// LOCAL STORAGE - SAVE DATA
// Save Progress
function saveProgress() {
    localStorage.setItem("spendableCookies", JSON.stringify(spendableCookies))
    localStorage.setItem("spentCookies", JSON.stringify(spentCookies))
    localStorage.setItem("totalCookiesMade", JSON.stringify(totalCookiesMade))
    localStorage.setItem("gameplayTime", JSON.stringify(gameplayTime))
    localStorage.setItem("cookiesPerSecond", JSON.stringify(cookiesPerSecond))
    localStorage.setItem("upgrade1Amount", JSON.stringify(upgrade1Amount))
    localStorage.setItem("upgrade2Amount", JSON.stringify(upgrade2Amount))
    localStorage.setItem("upgrade3Amount", JSON.stringify(upgrade3Amount))
    localStorage.setItem("upgrade4Amount", JSON.stringify(upgrade4Amount))
    localStorage.setItem("upgrade5Amount", JSON.stringify(upgrade5Amount))
    localStorage.setItem("upgrade6Amount", JSON.stringify(upgrade6Amount))
    localStorage.setItem("upgrade7Amount", JSON.stringify(upgrade7Amount))
    localStorage.setItem("upgrade8Amount", JSON.stringify(upgrade8Amount))
    localStorage.setItem("upgrade9Amount", JSON.stringify(upgrade9Amount))
    localStorage.setItem("upgrade10Amount", JSON.stringify(upgrade10Amount))
}

// Saves player progress every 1 second
// Putting this in a variable so we can give it an ID to clear the interval when saves need deleting
let saveProgressID = setInterval(saveProgress, 1000)


// Load Save
function loadSave() {
    const getSpendableCookies = localStorage.getItem("spendableCookies")
    const getSpentCookies = localStorage.getItem("spentCookies")
    const getTotalCookiesMade = localStorage.getItem("totalCookiesMade")
    const getGameplayTime = localStorage.getItem("gameplayTime")
    const getCookiesPerSecond = localStorage.getItem("cookiesPerSecond")
    const getUpgrade1Amount = localStorage.getItem("upgrade1Amount")
    const getUpgrade2Amount = localStorage.getItem("upgrade2Amount")
    const getUpgrade3Amount = localStorage.getItem("upgrade3Amount")
    const getUpgrade4Amount = localStorage.getItem("upgrade4Amount")
    const getUpgrade5Amount = localStorage.getItem("upgrade5Amount")
    const getUpgrade6Amount = localStorage.getItem("upgrade6Amount")
    const getUpgrade7Amount = localStorage.getItem("upgrade7Amount")
    const getUpgrade8Amount = localStorage.getItem("upgrade8Amount")
    const getUpgrade9Amount = localStorage.getItem("upgrade9Amount")
    const getUpgrade10Amount = localStorage.getItem("upgrade10Amount")
    const convertGetSpendableCookies  = JSON.parse(getSpendableCookies)
    const convertGetSpentCookies  = JSON.parse(getSpentCookies)
    const convertGetTotalCookiesMade  = JSON.parse(getTotalCookiesMade)
    const convertGameplayTime  = JSON.parse(getGameplayTime)
    const convertCookiesPerSecond  = JSON.parse(getCookiesPerSecond)
    const convertUpgrade1Amount  = JSON.parse(getUpgrade1Amount)
    const convertUpgrade2Amount  = JSON.parse(getUpgrade2Amount)
    const convertUpgrade3Amount  = JSON.parse(getUpgrade3Amount)
    const convertUpgrade4Amount  = JSON.parse(getUpgrade4Amount)
    const convertUpgrade5Amount  = JSON.parse(getUpgrade5Amount)
    const convertUpgrade6Amount  = JSON.parse(getUpgrade6Amount)
    const convertUpgrade7Amount  = JSON.parse(getUpgrade7Amount)
    const convertUpgrade8Amount  = JSON.parse(getUpgrade8Amount)
    const convertUpgrade9Amount  = JSON.parse(getUpgrade9Amount)
    const convertUpgrade10Amount  = JSON.parse(getUpgrade10Amount)
    spendableCookies = convertGetSpendableCookies
    spentCookies = convertGetSpentCookies
    totalCookiesMade = convertGetTotalCookiesMade
    gameplayTime = convertGameplayTime
    upgrade1Amount = convertUpgrade1Amount
    upgrade2Amount = convertUpgrade2Amount
    upgrade3Amount = convertUpgrade3Amount
    upgrade4Amount = convertUpgrade4Amount
    upgrade5Amount = convertUpgrade5Amount
    upgrade6Amount = convertUpgrade6Amount
    upgrade7Amount = convertUpgrade7Amount
    upgrade8Amount = convertUpgrade8Amount
    upgrade9Amount = convertUpgrade9Amount
    upgrade10Amount = convertUpgrade10Amount
    cookiesPerSecond = convertCookiesPerSecond
}

loadSave() // Loads once upon launching page



// FIX DISPLAYED STATISTICS
// Makes statistics visibly "0" when the player first loads the page
// Hacky fix
function resetCount(){
    if (cookiesPerSecond == null &&
        spendableCookies == null &&
        spentCookies == null &&
        totalCookiesMade == 0 &&
        gameplayTime == null) {
    cookiesPerSecond = 0
    spendableCookies = 0
    spentCookies = 0
    totalCookiesMade = 0
    gameplayTime = 0
}
}

function resetUpgradeCount(){
    if (upgrade1Amount == null &&
        upgrade2Amount == null &&
        upgrade3Amount == null && 
        upgrade4Amount == null &&
        upgrade5Amount == null &&
        upgrade6Amount == null &&
        upgrade7Amount == null &&
        upgrade8Amount == null && 
        upgrade9Amount == null &&
        upgrade10Amount == null) {
    upgrade1Amount = 0
    upgrade2Amount = 0
    upgrade3Amount = 0
    upgrade4Amount = 0
    upgrade5Amount = 0
    upgrade6Amount = 0
    upgrade7Amount = 0
    upgrade8Amount = 0
    upgrade9Amount = 0
    upgrade10Amount = 0
}
}

 // Sets counter to 0 on page load if there is no data
setInterval(resetCount, 1)
setInterval(resetUpgradeCount, 1)



// COOKIE SECTION
// COOKIES PER SECOND COUNT
 // Sets counter to 0 on page load if there is no data
 setInterval(function() {
    if (cookiesPerSecond == 0) {
        cookiesPerSecond = 0
    }
}, 1)


// CPS Counter on cookie section
const cpsCount = document.getElementById("cps-count")
cpsCount.textContent = `Your upgrades are baking ${cookiesPerSecond} cookies per second!`


// Changes the text depending on CPS value
function cookieCPSText() {
if (cookiesPerSecond > 1 || cookiesPerSecond == 0 || cookiesPerSecond == null) {
    cpsCount.textContent = `Your upgrades are baking ${cookiesPerSecond} cookies per second!`
} else if (cookiesPerSecond == 1) {
    cpsCount.textContent = `Your upgrades are baking ${cookiesPerSecond} cookie per second!`
}
}

setInterval(cookieCPSText, 1) // Checks the value at intervals



// BIG COOKIE - CLICK INCREMENT BUTTON
const cookieButton = document.getElementById("cookie-button")
cookieButton.addEventListener("click", function() {
    spendableCookies++
    updateSpendableCookieDisplay()
})


// DELETE SAVE GAME BUTTON
const deleteSaveButton = document.getElementById("delete-save")
deleteSaveButton.addEventListener("click", deleteSaveStep1)

function deleteSaveStep1() {
    deleteSaveButton.innerHTML = "Are you sure? Click again to delete."
    deleteSaveButton.addEventListener("click", deleteSaveStep2)
    setTimeout(function(){
        deleteSaveButton.innerHTML = "Click here to delete your save data."
        deleteSaveButton.removeEventListener("click", deleteSaveStep2)
    }, 5000) // Times out the message after 5 seconds to reduce chances of clicking unintentionally
}

// Progresses to this only clicked a second tiem
function deleteSaveStep2() {
    clearInterval(saveProgressID)
    localStorage.clear()
    location.reload()
}


// Alternative pop up box version (not in use)
// deleteSaveButton.addEventListener("click", deleteSave)
// function deleteSave() {
//     let whenClicked = confirm("Are you sure you would like to delete your save data?")
//     if (whenClicked == true){
//         console.log("Delete button clicked")
//         clearInterval(saveProgressID)
//         localStorage.clear()
//         location.reload()
//     } 
// }