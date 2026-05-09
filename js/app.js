/**
 * 伴宠Keeper — 纯前端 + localStorage
 */
(function () {
  'use strict';

  const STORAGE_USERS = 'bk_users_v1';
  const STORAGE_SESSION = 'bk_session_v1';

  const MEDAL_DEFS = [
    { id: 'm7', days: 7, name: '周守护勋章', icon: '🌟' },
    { id: 'm30', days: 30, name: '月陪伴勋章', icon: '🌙' },
    { id: 'm90', days: 90, name: '季度暖心勋章', icon: '💝' },
    { id: 'm180', days: 180, name: '半载相守勋章', icon: '🎀' },
    { id: 'm270', days: 270, name: '九月相伴勋章', icon: '🔗' },
    { id: 'm365', days: 365, name: '全年挚爱终极勋章', icon: '👑' },
  ];

  const SHOP_ITEMS = [
    { id: 'snack_fish', name: '小鱼干', price: 30, type: 'snack', category: 'snack', rarity: 'normal', art: '🐟', mood: '开心到转圈！', happyBonus: 10 },
    { id: 'snack_bone', name: '磨牙骨', price: 28, type: 'snack', category: 'snack', rarity: 'normal', art: '🦴', mood: '汪汪满足～', happyBonus: 10 },
    { id: 'snack_meat', name: '鲜肉干', price: 42, type: 'snack', category: 'snack', rarity: 'normal', art: '🥩', mood: '满嘴肉香～', happyBonus: 12 },
    { id: 'snack_milk', name: '小奶糕', price: 38, type: 'snack', category: 'snack', rarity: 'rare', art: '🍼', mood: '软软糯糯好幸福', happyBonus: 14 },
    { id: 'snack_can', name: '营养罐头', price: 55, type: 'snack', category: 'snack', rarity: 'rare', art: '🥫', mood: '咕噜咕噜全吃完！', happyBonus: 16 },
    { id: 'snack_campus', name: '校园限定·樱花冻干', price: 68, type: 'snack', category: 'snack', rarity: 'limited', campus: true, art: '🌸', mood: '限定口味超特别～', happyBonus: 18 },
    { id: 'toy_ball', name: '弹力球', price: 45, type: 'toy', category: 'toy', rarity: 'normal', art: '⚽', scene: 'park', mood: '想出去玩！' },
    { id: 'toy_mouse', name: '逗猫棒', price: 40, type: 'toy', category: 'toy', rarity: 'normal', art: '🎀', scene: 'default', mood: '扑来扑去～' },
    { id: 'toy_disc', name: '软飞盘', price: 58, type: 'toy', category: 'toy', rarity: 'rare', art: '🥏', scene: 'park', mood: '接住啦！' },
    { id: 'toy_yarn', name: '毛线球', price: 35, type: 'toy', category: 'toy', rarity: 'normal', art: '🧶', scene: 'default', mood: '滚来滚去停不下～' },
    { id: 'bed_soft', name: '软软窝', price: 120, type: 'bed', category: 'home', rarity: 'normal', art: '🛏️', scene: 'cozy', mood: '好困好舒服…' },
    { id: 'bed_lux', name: '豪华宠物窝', price: 220, type: 'bed', category: 'home', rarity: 'rare', art: '👑', scene: 'cozy', mood: '贵族待遇～' },
    { id: 'home_blanket', name: '云朵小毯子', price: 65, type: 'bed', category: 'home', rarity: 'normal', art: '☁️', scene: 'cozy', mood: '裹紧紧～' },
    { id: 'home_bowl', name: '马卡龙食盆套装', price: 72, type: 'bed', category: 'home', rarity: 'rare', art: '🍽️', scene: 'default', mood: '干饭更香！' },
    { id: 'home_fence', name: '宿舍迷你围栏', price: 88, type: 'bed', category: 'home', rarity: 'limited', campus: true, art: '🏠', scene: 'default', mood: '我的小地盘～' },
    { id: 'collar_pink', name: '樱花项圈', price: 55, type: 'collar', category: 'dress', rarity: 'normal', art: '💮', color: '#ff6b9d' },
    { id: 'collar_mint', name: '薄荷项圈', price: 55, type: 'collar', category: 'dress', rarity: 'normal', art: '🌿', color: '#2ecc71' },
    { id: 'outfit_sweater', name: '小毛衣', price: 80, type: 'outfit', category: 'dress', rarity: 'normal', art: '🧶', outfitColor: 'rgba(255,182,193,0.85)' },
    { id: 'outfit_cape', name: '超人小披风', price: 95, type: 'outfit', category: 'dress', rarity: 'rare', art: '🦸', outfitColor: 'rgba(116,185,255,0.85)' },
    { id: 'outfit_bow', name: '丝绒蝴蝶结', price: 48, type: 'outfit', category: 'dress', rarity: 'normal', art: '🎀', outfitColor: 'rgba(255,105,180,0.75)' },
    { id: 'outfit_hat', name: '渔夫帽', price: 62, type: 'outfit', category: 'dress', rarity: 'rare', art: '👒', outfitColor: 'rgba(255,235,180,0.9)' },
    { id: 'skin_campus', name: '校园限定·奶茶毛色', price: 180, type: 'outfit', category: 'dress', rarity: 'limited', campus: true, art: '🧋', outfitColor: 'rgba(210,180,140,0.9)', mood: '限定毛色超温柔～' },
  ];

  const LEADERBOARD_SEED = [
    { name: '信工·小葵', happy: 96, level: 8, items: 22 },
    { name: '经管·阿桃', happy: 91, level: 7, items: 18 },
    { name: '外语·年糕', happy: 88, level: 6, items: 15 },
    { name: '艺术·米团', happy: 84, level: 6, items: 14 },
    { name: '理学院·黑豆', happy: 79, level: 5, items: 11 },
    { name: '社团联·七七', happy: 72, level: 4, items: 9 },
  ];

  const SHOP_CATEGORY_LABEL = {
    snack: '零食专区',
    toy: '玩具专区',
    home: '窝居家居',
    dress: '装扮服饰',
  };

  const SPORT_LABELS = {
    run: '跑步',
    walk: '散步 / 校园溜达',
    rope: '跳绳',
    yoga: '瑜伽',
    dorm: '宿舍徒手 / 健身',
    ball: '球类运动',
    bike: '骑行',
    swim: '游泳',
    other: '其他',
  };

  const MAX_FREE_PHOTO_DATA_URL = 480000;

  /** 读取图片为 Data URL；超长则省略 base64，仅保留文件名标记 */
  function readImageFileCapped(file, onDone) {
    if (!file) {
      onDone(null, {});
      return;
    }
    var fr = new FileReader();
    fr.onload = function () {
      var url = fr.result;
      if (typeof url === 'string' && url.length > MAX_FREE_PHOTO_DATA_URL) {
        onDone(null, { name: file.name, omitted: true });
      } else {
        onDone(url, { name: file.name });
      }
    };
    fr.onerror = function () {
      onDone(null, { error: true });
    };
    fr.readAsDataURL(file);
  }

  function loadUsers() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_USERS) || '{}');
    } catch {
      return {};
    }
  }

  function saveUsers(users) {
    localStorage.setItem(STORAGE_USERS, JSON.stringify(users));
  }

  function userDataKey(username) {
    return 'bk_userdata_' + encodeURIComponent(username);
  }

  function defaultUserData() {
    return {
      petType: null,
      happiness: 0,
      points: 0,
      plans: [],
      backpack: {},
      equipped: { collar: null, outfit: null, toy: null, bed: null },
      medals: [],
      streak100: 0,
      lastClosingDate: null,
      lastClosingHappiness: null,
      planCompletionsByDate: {},
      freeCheckInDates: [],
      freeCheckRecords: [],
      planCompletionRecords: [],
      totalPlanCompletes: 0,
      petLevel: 1,
      lifetimePlayCount: 0,
    };
  }

  function sportLabelFromKey(key, customText) {
    if (key === 'other') return (customText && String(customText).trim()) || '其他';
    return SPORT_LABELS[key] || key || '运动';
  }

  function hasFreeCheckInToday() {
    if (!userData) return false;
    var today = todayStr();
    if (userData.freeCheckRecords && userData.freeCheckRecords.some(function (r) { return r.date === today; })) {
      return true;
    }
    return (userData.freeCheckInDates || []).indexOf(today) !== -1;
  }

  function migrateUserDataFields() {
    if (!userData) return;
    if (userData.totalPlanCompletes == null) {
      var n = 0;
      var o = userData.planCompletionsByDate || {};
      Object.keys(o).forEach(function (k) {
        if (/^\d{4}-\d{2}-\d{2}$/.test(k) && Array.isArray(o[k])) n += o[k].length;
        else if (k.indexOf('_week_') === 0 && typeof o[k] === 'number') n += o[k];
      });
      userData.totalPlanCompletes = n;
    }
    if (!userData.freeCheckRecords) {
      userData.freeCheckRecords = [];
      (userData.freeCheckInDates || []).forEach(function (d) {
        if (/^\d{4}-\d{2}-\d{2}$/.test(d)) {
          userData.freeCheckRecords.push({
            date: d,
            sportKey: 'other',
            sportLabel: '历史打卡',
            durationMin: 0,
            steps: null,
            lat: null,
            lng: null,
            photoDataUrl: null,
            migrated: true,
          });
        }
      });
    }
    if (userData.lifetimePlayCount == null) {
      userData.lifetimePlayCount = (userData.freeCheckRecords || []).length || (userData.freeCheckInDates || []).length;
    }
    if (!userData.planCompletionRecords) {
      userData.planCompletionRecords = [];
    }
    userData.petLevel = computePetLevel();
  }

  function computePetLevel() {
    var t = userData.totalPlanCompletes || 0;
    return Math.min(10, Math.max(1, 1 + Math.floor(t / 5)));
  }

  /** 今日综合计划完成度 0–100；无计划时返回 null */
  function getTodayPlanCompletionPercent() {
    if (!userData.plans || !userData.plans.length) return null;
    var today = todayStr();
    var dailies = userData.plans.filter(function (p) {
      return p.mode === 'daily';
    });
    var weeklies = userData.plans.filter(function (p) {
      return p.mode === 'weekly';
    });
    var parts = [];
    if (dailies.length) {
      var doneD = dailies.filter(function (p) {
        return (userData.planCompletionsByDate[today] || []).indexOf(p.id) !== -1;
      }).length;
      parts.push((doneD / dailies.length) * 100);
    }
    if (weeklies.length) {
      var wk = weekId();
      var sumW = 0;
      weeklies.forEach(function (p) {
        var c = userData.planCompletionsByDate['_week_' + wk + '_' + p.id] || 0;
        var tgt = p.weeklyTarget || 3;
        sumW += Math.min(100, (c / tgt) * 100);
      });
      parts.push(sumW / weeklies.length);
    }
    if (!parts.length) return null;
    var avg = parts.reduce(function (a, b) {
      return a + b;
    }, 0) / parts.length;
    return Math.round(Math.min(100, Math.max(0, avg)));
  }

  function needsCriticalCare() {
    var pct = getTodayPlanCompletionPercent();
    var lowHappy = userData.happiness < 50;
    var lowPct = pct !== null && pct < 50;
    return lowHappy || lowPct;
  }

  function rarityLabel(r) {
    if (r === 'rare') return '稀有';
    if (r === 'limited') return '限定';
    return '普通';
  }

  function loadUserData(username) {
    try {
      const raw = localStorage.getItem(userDataKey(username));
      if (!raw) return defaultUserData();
      return { ...defaultUserData(), ...JSON.parse(raw) };
    } catch {
      return defaultUserData();
    }
  }

  function saveUserData(username, data) {
    localStorage.setItem(userDataKey(username), JSON.stringify(data));
  }

  let currentUser = null;
  let userData = null;

  function todayStr() {
    const d = new Date();
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  }

  function pad(n) {
    return n < 10 ? '0' + n : '' + n;
  }

  function addDays(dateStr, delta) {
    const [y, m, d] = dateStr.split('-').map(Number);
    const dt = new Date(y, m - 1, d + delta);
    return dt.getFullYear() + '-' + pad(dt.getMonth() + 1) + '-' + pad(dt.getDate());
  }

  function daysBetween(a, b) {
    const A = new Date(a.replace(/-/g, '/'));
    const B = new Date(b.replace(/-/g, '/'));
    return Math.round((B - A) / (86400000));
  }

  /** 跨日结算：根据「上一日收盘幸福值」更新连续满 100 天数与勋章；返回本次新解锁的勋章 id */
  function processDayRollover() {
    const newMedalIds = [];
    const today = todayStr();
    const lastClose = userData.lastClosingDate;
    const lastHappy = userData.lastClosingHappiness;

    if (!lastClose) {
      userData.lastClosingDate = today;
      userData.lastClosingHappiness = userData.happiness;
      return newMedalIds;
    }

    if (lastClose === today) return newMedalIds;

    const gap = daysBetween(lastClose, today);
    if (gap <= 0) return newMedalIds;

    if (gap === 1) {
      if (lastHappy === 100) {
        userData.streak100 = (userData.streak100 || 0) + 1;
      } else {
        userData.streak100 = 0;
      }
      var yesterday = addDays(today, -1);
      var completedYesterday = userData.planCompletionsByDate[yesterday];
      if (!completedYesterday || !completedYesterday.length) {
        userData.happiness = Math.max(0, userData.happiness - 12);
      }
    } else if (gap > 1) {
      userData.streak100 = 0;
    }

    MEDAL_DEFS.forEach(function (m) {
      if (userData.streak100 >= m.days && userData.medals.indexOf(m.id) === -1) {
        userData.medals.push(m.id);
        newMedalIds.push(m.id);
      }
    });

    userData.lastClosingDate = today;
    userData.lastClosingHappiness = userData.happiness;
    return newMedalIds;
  }

  function persistClosingHappiness() {
    const today = todayStr();
    userData.lastClosingDate = today;
    userData.lastClosingHappiness = userData.happiness;
  }

  function refreshDayState() {
    if (!currentUser || !userData || !userData.petType) return;
    var newMedals = processDayRollover();
    saveUserData(currentUser, userData);
    if (newMedals && newMedals.length) {
      queueMedalPopups(newMedals);
    }
  }

  var _medalQueue = [];
  function queueMedalPopups(ids) {
    ids.forEach(function (id) {
      if (_medalQueue.indexOf(id) === -1) _medalQueue.push(id);
    });
    showNextMedalPopup();
  }

  function showNextMedalPopup() {
    if (!_medalQueue.length) return;
    var id = _medalQueue.shift();
    var def = MEDAL_DEFS.find(function (m) {
      return m.id === id;
    });
    if (!def) {
      showNextMedalPopup();
      return;
    }
    var ov = document.getElementById('modalMedal');
    document.getElementById('medalPopIcon').textContent = def.icon;
    document.getElementById('medalPopTitle').textContent = '解锁成就';
    document.getElementById('medalPopName').textContent = def.name;
    document.getElementById('medalPopSub').textContent = '连续 ' + def.days + ' 天幸福值满格';
    ov.style.display = 'flex';
    ov.classList.add('is-visible');
    updateBodyScrollLock();
    clearTimeout(showNextMedalPopup._t);
    showNextMedalPopup._t = setTimeout(function () {
      closeMedalModal();
      showNextMedalPopup();
    }, 3200);
  }

  function updateBodyScrollLock() {
    var flex = function (id) {
      var el = document.getElementById(id);
      return el && el.style.display === 'flex';
    };
    var lock =
      flex('modalAdopt') ||
      flex('modalMedal') ||
      flex('modalReward') ||
      flex('modalRules') ||
      flex('modalFreeCheck') ||
      flex('modalPlanVerify') ||
      (document.getElementById('panelBag') && document.getElementById('panelBag').classList.contains('is-open'));
    document.body.classList.toggle('modal-open', !!lock);
  }

  function closeMedalModal() {
    var ov = document.getElementById('modalMedal');
    if (!ov) return;
    ov.classList.remove('is-visible');
    ov.style.display = 'none';
    updateBodyScrollLock();
  }

  function showRewardModal(opts) {
    document.getElementById('rewardTitle').textContent = opts.title || '太棒啦';
    document.getElementById('rewardPoints').textContent = '+' + (opts.points || 0) + ' 积分';
    document.getElementById('rewardHappy').textContent = '幸福值 +' + (opts.happy || 0);
    var ex = document.getElementById('rewardExtra');
    if (ex) {
      if (opts.levelUp) {
        ex.style.display = 'block';
        ex.textContent = '🎉 宠物升级至 Lv.' + (userData.petLevel || 1) + '，解锁更元气动作与毛色微调～';
      } else {
        ex.style.display = 'none';
        ex.textContent = '';
      }
    }
    var m = document.getElementById('modalReward');
    m.style.display = 'flex';
    m.classList.add('is-visible');
    updateBodyScrollLock();
  }

  function closeRewardModal() {
    var m = document.getElementById('modalReward');
    m.classList.remove('is-visible');
    m.style.display = 'none';
    updateBodyScrollLock();
  }

  function showPetCornerBubble(text) {
    var el = document.getElementById('petCornerBubble');
    if (!el) return;
    el.textContent = text;
    el.classList.add('show');
    clearTimeout(showPetCornerBubble._t);
    showPetCornerBubble._t = setTimeout(function () {
      el.classList.remove('show');
    }, 2600);
  }

  function clampHappy(v) {
    return Math.max(0, Math.min(100, Math.round(v)));
  }

  function getPetStateClass() {
    const h = userData.happiness;
    if (needsCriticalCare()) return 'state-sad';
    if (h >= 100) return 'state-happy';
    return 'state-normal';
  }

  function getReminderText() {
    var pct = getTodayPlanCompletionPercent();
    var lowHappy = userData.happiness < 50;
    var lowPct = pct !== null && pct < 50;
    if (lowHappy || lowPct) {
      var msgs = ['我好饿呀…', '我口渴啦…', '没人陪我玩好孤单…'];
      if (lowPct && !lowHappy) {
        return '今天计划还没完成一半，帮我打卡好不好…';
      }
      return msgs[Math.floor(Math.random() * msgs.length)];
    }
    var soft = ['今天要运动陪我玩哦～', '等你一起动一动呀', '一起去看看今日目标吧'];
    return soft[Math.floor(Math.random() * soft.length)];
  }

  function maybeSpeakCareLine() {
    if (!userData || !needsCriticalCare() || typeof window.speechSynthesis === 'undefined') return;
    try {
      var k = 'bk_voice_' + encodeURIComponent(currentUser || '') + '_' + todayStr();
      if (sessionStorage.getItem(k)) return;
      sessionStorage.setItem(k, '1');
      var u = new SpeechSynthesisUtterance(getReminderText());
      u.lang = 'zh-CN';
      u.rate = 1.02;
      window.speechSynthesis.speak(u);
    } catch (e) {}
  }

  function updateHomeMeta() {
    if (!userData || !userData.petType) return;
    var pct = getTodayPlanCompletionPercent();
    var h = userData.happiness;
    var row = document.getElementById('homeCompletionRow');
    if (row) {
      row.textContent =
        pct === null
          ? '今日计划完成度：暂无固定计划（仍可自由打卡陪玩）'
          : '今日计划完成度：' + pct + '%（与温饱幸福值联动）';
    }
    var lvEl = document.getElementById('petLevelNum');
    if (lvEl) lvEl.textContent = 'Lv.' + (userData.petLevel || 1);
    var tp = document.getElementById('petTotalPlans');
    if (tp) tp.textContent = String(userData.totalPlanCompletes || 0);
    var chips = document.getElementById('petStatusChips');
    if (chips) {
      chips.innerHTML = '';
      if (needsCriticalCare()) {
        ['有点饿', '想喝水', '求陪玩'].forEach(function (t) {
          var s = document.createElement('span');
          s.className = 'status-chip status-chip--warn';
          s.textContent = t;
          chips.appendChild(s);
        });
      } else if (h >= 100) {
        var s1 = document.createElement('span');
        s1.className = 'status-chip';
        s1.textContent = '元气满满';
        chips.appendChild(s1);
      } else {
        var s2 = document.createElement('span');
        s2.className = 'status-chip';
        s2.textContent = '平稳可爱';
        chips.appendChild(s2);
      }
    }
  }

  function uid() {
    return 'p_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8);
  }

  function showToast(msg) {
    const el = document.getElementById('toast');
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(function () {
      el.classList.remove('show');
    }, 2200);
  }

  function getShopItem(id) {
    return SHOP_ITEMS.find(function (x) {
      return x.id === id;
    });
  }

  function renderPet() {
    if (!userData || !userData.petType) return;

    const wrap = document.getElementById('petActor');
    var wrapOuter = document.querySelector('.pet-actor-wrap');
    if (wrapOuter) {
      wrapOuter.classList.toggle('pet-actor-wrap--idle', !needsCriticalCare());
    }
    const bubble = document.getElementById('petBubble');
    const bar = document.getElementById('happinessFill');
    const stage = document.querySelector('.pet-scene');

    const h = userData.happiness;
    wrap.className =
      'pet-actor pet-' + userData.petType + ' ' + getPetStateClass() + ' pet-actor--standee';
    if (h >= 100 && !needsCriticalCare()) wrap.classList.add('pet-actor--halo');
    else wrap.classList.remove('pet-actor--halo');

    bar.style.width = h + '%';
    var hv = document.getElementById('happinessValue');
    if (hv) hv.textContent = h + ' / 100';

    bubble.textContent = getReminderText();
    bubble.classList.remove('hidden');
    if (needsCriticalCare()) {
      bubble.classList.add('pet-bubble--warn');
      maybeSpeakCareLine();
    } else {
      bubble.classList.remove('pet-bubble--warn');
    }

    var bodyHue = wrap.querySelector('.pet-body');
    if (bodyHue) {
      if (needsCriticalCare()) {
        bodyHue.style.filter = '';
      } else {
        var lv = userData.petLevel || 1;
        bodyHue.style.filter = 'hue-rotate(' + (lv - 1) * 10 + 'deg) saturate(1.08)';
      }
    }

    updateHomeMeta();

    var scene = 'default';
    if (userData.equipped && userData.equipped.bed) {
      var bedItem = getShopItem(userData.equipped.bed);
      if (bedItem && bedItem.scene) scene = bedItem.scene;
    }
    if (userData.equipped && userData.equipped.toy) {
      var toyItem = getShopItem(userData.equipped.toy);
      if (toyItem && toyItem.scene) scene = toyItem.scene;
    }
    stage.setAttribute('data-scene', scene);

    var collar = document.getElementById('petCollar');
    var outfit = document.getElementById('petOutfit');
    if (userData.equipped.collar) {
      var ci = getShopItem(userData.equipped.collar);
      collar.style.setProperty('--collar-color', (ci && ci.color) || '#ff6b9d');
      collar.style.display = 'block';
    } else {
      collar.style.display = 'block';
      collar.style.setProperty('--collar-color', '#ff8fab');
    }
    if (userData.equipped.outfit) {
      var oi = getShopItem(userData.equipped.outfit);
      outfit.style.setProperty('--outfit-color', (oi && oi.outfitColor) || 'rgba(255,182,193,0.85)');
      outfit.style.setProperty('--outfit-opacity', '1');
    } else {
      outfit.style.setProperty('--outfit-opacity', '0');
    }

    var hp = document.getElementById('headerPoints');
    if (hp) hp.textContent = '积分 ' + userData.points;
    var shopBal = document.getElementById('shopBalance');
    if (shopBal) shopBal.textContent = String(userData.points);
    saveUserData(currentUser, userData);
  }

  function switchScreen(id) {
    refreshDayState();
    document.querySelectorAll('.screen').forEach(function (s) {
      s.classList.toggle('active', s.id === 'screen-' + id);
    });
    document.querySelectorAll('.bottom-nav button').forEach(function (b) {
      b.classList.toggle('active', b.dataset.nav === id);
    });
    if (id === 'home') {
      renderPet();
      updateHomeDate();
      renderHomeMoodCard();
    }
    if (id === 'exercise') renderExercise();
    if (id === 'shop') renderShop();
    if (id === 'social') renderSocial();
    if (id === 'profile') renderProfile();
  }

  function updateHomeDate() {
    var el = document.getElementById('homeDate');
    if (!el) return;
    var d = new Date();
    var w = ['日', '一', '二', '三', '四', '五', '六'][d.getDay()];
    el.textContent =
      d.getFullYear() + '年' + (d.getMonth() + 1) + '月' + d.getDate() + '日 周' + w;
  }

  function renderHomeMoodCard() {
    var el = document.getElementById('homeMoodText');
    if (!el || !userData) return;
    var h = userData.happiness;
    var pct = getTodayPlanCompletionPercent();
    if (needsCriticalCare()) {
      el.textContent =
        '需要你的运动打卡！完成计划 = 帮我吃饱喝足；也可以先自由陪玩一下～';
    } else if (h >= 100) {
      el.textContent = '超级开心！幸福值满分，今天也要保持运动节奏哦～';
    } else if (pct !== null && pct < 80) {
      el.textContent = '还不错～再把今日计划多完成一些，我会更满足！';
    } else if (h >= 50) {
      el.textContent = '状态平稳，记得有空来摸摸我、逛逛街换身装扮～';
    } else {
      el.textContent = '有点蔫蔫的…快去完成运动或喂点小零食吧';
    }
  }

  function renderExercise() {
    renderPlans();
    renderCheckin();
    updateExerciseGoalCard();
  }

  function updateExerciseGoalCard() {
    var today = todayStr();
    var n = (userData.planCompletionsByDate[today] || []).length;
    var el = document.getElementById('exerciseGoalSummary');
    if (el) el.textContent = '今日已完成 ' + n + ' 次计划打卡（含每日/每周进度）';
    var line = document.getElementById('exerciseCompletionLine');
    var pct = getTodayPlanCompletionPercent();
    if (line) {
      line.textContent =
        pct === null ? '综合完成度：暂无固定计划，可通过自由打卡陪玩' : '综合完成度：' + pct + '%（每日 + 每周计划加权）';
    }
  }

  function renderPlans() {
    const list = document.getElementById('planList');
    list.innerHTML = '';
    if (!userData.plans.length) {
      list.innerHTML = '<p class="empty-hint">还没有计划哦，点击下方创建一个吧～</p>';
      return;
    }
    const today = todayStr();
    userData.plans.forEach(function (p) {
      const div = document.createElement('div');
      div.className = 'plan-item';
      const doneToday = (userData.planCompletionsByDate[today] || []).indexOf(p.id) !== -1;
      const weekKey = weekId();
      const weekCount = (userData.planCompletionsByDate['_week_' + weekKey + '_' + p.id] || 0);
      let meta = '';
      if (p.mode === 'daily') {
        meta = doneToday ? '今日已完成 ✓' : '今日待完成';
      } else {
        meta = '本周进度 ' + weekCount + ' / ' + (p.weeklyTarget || 3);
      }
      var sportTag = p.sportType ? sportLabelFromKey(p.sportType, p.sportCustom) : '';
      var periodLine =
        (p.mode === 'daily' ? '每日计划' : '每周计划') +
        (sportTag ? ' · ' + escapeHtml(sportTag) : '') +
        ' · 完成 +' +
        p.reward +
        ' 分 · ' +
        meta;
      div.innerHTML =
        '<div><strong>' +
        escapeHtml(p.title) +
        '</strong><div class="plan-item__meta">' +
        periodLine +
        '</div></div>';
      const btn = document.createElement('button');
      btn.className = 'btn btn--primary btn--sm';
      btn.textContent = p.mode === 'daily' ? (doneToday ? '已完成' : '核验并打卡') : weekCount >= (p.weeklyTarget || 3) ? '本周已满' : '核验并完成';
      btn.disabled =
        p.mode === 'daily'
          ? doneToday
          : weekCount >= (p.weeklyTarget || 3);
      btn.onclick = function () {
        openPlanVerifyModal(p);
      };
      div.appendChild(btn);
      list.appendChild(div);
    });
  }

  function weekId() {
    const d = new Date();
    return d.getFullYear() + '-W' + weekNumber(d);
  }

  function weekNumber(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  }

  /** 当日计划完成度越高，本次任务额外幸福值加成（体现「喂得越饱」） */
  function pctHappinessBonus() {
    var pct = getTodayPlanCompletionPercent();
    if (pct === null) return 0;
    if (pct >= 100) return 8;
    if (pct >= 80) return 5;
    if (pct >= 50) return 2;
    return 0;
  }

  function canCompletePlanNow(p) {
    if (!p || !userData) return false;
    const today = todayStr();
    if (p.mode === 'daily') {
      return (userData.planCompletionsByDate[today] || []).indexOf(p.id) === -1;
    }
    var wk = weekId();
    var key = '_week_' + wk + '_' + p.id;
    var c = userData.planCompletionsByDate[key] || 0;
    return c < (p.weeklyTarget || 3);
  }

  function executePlanComplete(p, verify) {
    const today = todayStr();
    if (p.mode === 'daily') {
      if ((userData.planCompletionsByDate[today] || []).indexOf(p.id) !== -1) return false;
      userData.planCompletionsByDate[today] = userData.planCompletionsByDate[today] || [];
      userData.planCompletionsByDate[today].push(p.id);
    } else {
      var wk = weekId();
      var key = '_week_' + wk + '_' + p.id;
      var c = userData.planCompletionsByDate[key] || 0;
      if (c >= (p.weeklyTarget || 3)) return false;
      userData.planCompletionsByDate[key] = c + 1;
    }
    userData.planCompletionRecords = userData.planCompletionRecords || [];
    userData.planCompletionRecords.push({
      planId: p.id,
      planTitle: p.title,
      sportType: p.sportType || null,
      sportLabel: p.sportType ? sportLabelFromKey(p.sportType, p.sportCustom) : null,
      mode: p.mode,
      date: today,
      at: new Date().toISOString(),
      durationMin: verify.durationMin,
      steps: verify.steps,
      lat: verify.lat,
      lng: verify.lng,
      photoDataUrl: verify.photoDataUrl || null,
      photoName: verify.photoName || null,
      photoOmitted: !!verify.photoOmitted,
    });
    userData.points += p.reward;
    var bonus = pctHappinessBonus();
    var happyGain = 18 + bonus;
    userData.happiness = clampHappy(userData.happiness + happyGain);
    var beforeLv = computePetLevel();
    userData.totalPlanCompletes = (userData.totalPlanCompletes || 0) + 1;
    userData.petLevel = computePetLevel();
    var levelUp = userData.petLevel > beforeLv;
    persistClosingHappiness();
    saveUserData(currentUser, userData);
    showRewardModal({ title: '任务完成 · 已喂食喂水', points: p.reward, happy: happyGain, levelUp: levelUp });
    renderExercise();
    renderPet();
    renderHomeMoodCard();
    return true;
  }

  function resetPlanVerifyForm() {
    var du = document.getElementById('planVerifyDuration');
    if (du) du.value = '';
    var fs = document.getElementById('planVerifySteps');
    if (fs) fs.value = '';
    var ph = document.getElementById('planVerifyPhoto');
    if (ph) ph.value = '';
    var pn = document.getElementById('planVerifyPhotoName');
    if (pn) pn.textContent = '';
    var lr = document.getElementById('planVerifyLocResult');
    if (lr) lr.textContent = '';
    window._planVerifyLoc = null;
  }

  function openPlanVerifyModal(p) {
    if (!userData.petType) {
      showToast('请先完成领养');
      return;
    }
    refreshDayState();
    if (!canCompletePlanNow(p)) {
      showToast('当前计划暂无法打卡');
      return;
    }
    window._pendingPlanComplete = p;
    resetPlanVerifyForm();
    var titleEl = document.getElementById('planVerifyTitle');
    if (titleEl) titleEl.textContent = '核验 · ' + (p.title || '运动计划');
    var metaEl = document.getElementById('planVerifyMeta');
    if (metaEl) {
      var sport = p.sportType ? sportLabelFromKey(p.sportType, p.sportCustom) : '';
      metaEl.textContent =
        (p.mode === 'daily' ? '每日计划' : '每周计划') +
        (sport ? ' · ' + sport : '') +
        ' · 完成 +' +
        (p.reward || 0) +
        ' 积分';
    }
    var m = document.getElementById('modalPlanVerify');
    if (!m) return;
    m.style.display = 'flex';
    m.classList.add('is-visible');
    updateBodyScrollLock();
  }

  function closePlanVerifyModal() {
    window._pendingPlanComplete = null;
    var m = document.getElementById('modalPlanVerify');
    if (!m) return;
    m.classList.remove('is-visible');
    m.style.display = 'none';
    updateBodyScrollLock();
  }

  function submitPlanVerify() {
    var p = window._pendingPlanComplete;
    if (!p || !userData) {
      showToast('请先选择要完成的计划');
      return;
    }
    refreshDayState();
    if (!canCompletePlanNow(p)) {
      showToast('该计划已完成或本周已满');
      closePlanVerifyModal();
      return;
    }
    var duration = parseInt(document.getElementById('planVerifyDuration').value, 10);
    if (!duration || duration < 5) {
      showToast('请填写本次运动时长，至少 5 分钟');
      return;
    }
    var stepsRaw = document.getElementById('planVerifySteps').value.trim();
    var steps = null;
    if (stepsRaw !== '') {
      var sn = parseInt(stepsRaw, 10);
      if (!sn || sn < 1) {
        showToast('步数请填写正整数，或留空');
        return;
      }
      steps = sn;
    }
    var fileInput = document.getElementById('planVerifyPhoto');
    var file = fileInput.files && fileInput.files[0];
    var loc = window._planVerifyLoc;
    var hasLoc = loc && typeof loc.lat === 'number' && typeof loc.lng === 'number';
    if (!file && !hasLoc) {
      showToast('请上传运动照片或获取定位完成核验');
      return;
    }
    if (file && file.size > 1200000) {
      showToast('照片文件过大，请选一张较小的图片');
      return;
    }

    function finishWithPhoto(photoDataUrl, photoMeta) {
      if (photoMeta && photoMeta.error) {
        showToast('照片读取失败，请重试');
        return;
      }
      var verify = {
        durationMin: duration,
        steps: steps,
        lat: hasLoc ? loc.lat : null,
        lng: hasLoc ? loc.lng : null,
        photoDataUrl: photoDataUrl || null,
        photoName: (photoMeta && photoMeta.name) || (file ? file.name : null),
        photoOmitted: !!(photoMeta && photoMeta.omitted),
      };
      if (!executePlanComplete(p, verify)) {
        showToast('打卡失败，请刷新后重试');
        closePlanVerifyModal();
        return;
      }
      closePlanVerifyModal();
    }

    if (file) {
      readImageFileCapped(file, function (url, meta) {
        finishWithPhoto(url, meta);
      });
    } else {
      finishWithPhoto(null, {});
    }
  }

  function renderCheckin() {
    const done = hasFreeCheckInToday();
    document.getElementById('checkinStatus').textContent = done
      ? '今日已成功计划外打卡，明天可继续记录新运动～'
      : '请填写真实运动信息，并上传照片或完成定位核验。不计入计划完成度、不发任务积分；时长越长幸福值加成略高。';
    const btn = document.getElementById('btnFreeCheckin');
    btn.disabled = done;
    btn.textContent = done ? '今日已完成自由打卡' : '填写计划外自由打卡';
  }

  function resetFreeCheckForm() {
    var st = document.getElementById('freeSportType');
    if (st) st.value = 'run';
    var cw = document.getElementById('freeSportCustomWrap');
    if (cw) cw.style.display = 'none';
    var fc = document.getElementById('freeSportCustom');
    if (fc) fc.value = '';
    var du = document.getElementById('freeDuration');
    if (du) du.value = '';
    var fs = document.getElementById('freeSteps');
    if (fs) fs.value = '';
    var ph = document.getElementById('freePhoto');
    if (ph) ph.value = '';
    var pn = document.getElementById('freePhotoName');
    if (pn) pn.textContent = '';
    var lr = document.getElementById('freeLocResult');
    if (lr) lr.textContent = '';
    window._freeCheckLoc = null;
  }

  function openFreeCheckModal() {
    if (!userData.petType) {
      showToast('请先完成领养');
      return;
    }
    refreshDayState();
    if (hasFreeCheckInToday()) {
      showToast('今日已自由打卡过啦');
      return;
    }
    resetFreeCheckForm();
    var m = document.getElementById('modalFreeCheck');
    m.style.display = 'flex';
    m.classList.add('is-visible');
    updateBodyScrollLock();
  }

  function closeFreeCheckModal() {
    var m = document.getElementById('modalFreeCheck');
    if (!m) return;
    m.classList.remove('is-visible');
    m.style.display = 'none';
    updateBodyScrollLock();
  }

  function calcFreeCheckHappyGain(durationMin) {
    var base = 5;
    var bonus = Math.min(4, Math.floor(durationMin / 15));
    return base + bonus;
  }

  function submitFreeCheckin() {
    refreshDayState();
    if (hasFreeCheckInToday()) {
      showToast('今日已打卡');
      return;
    }
    var sportKey = document.getElementById('freeSportType').value;
    var custom = document.getElementById('freeSportCustom').value.trim();
    if (sportKey === 'other' && !custom) {
      showToast('请选择或填写运动类型');
      return;
    }
    var duration = parseInt(document.getElementById('freeDuration').value, 10);
    if (!duration || duration < 5) {
      showToast('请填写运动时长，至少 5 分钟');
      return;
    }
    var stepsRaw = document.getElementById('freeSteps').value.trim();
    var steps = null;
    if (stepsRaw !== '') {
      var sn = parseInt(stepsRaw, 10);
      if (!sn || sn < 1) {
        showToast('步数请填写正整数，或留空');
        return;
      }
      steps = sn;
    }
    var fileInput = document.getElementById('freePhoto');
    var file = fileInput.files && fileInput.files[0];
    var loc = window._freeCheckLoc;
    var hasLoc = loc && typeof loc.lat === 'number' && typeof loc.lng === 'number';
    if (!file && !hasLoc) {
      showToast('请上传运动照片或点击获取定位完成核验');
      return;
    }
    if (file && file.size > 1200000) {
      showToast('照片文件过大，请选一张较小的图片');
      return;
    }

    var sportLabel = sportLabelFromKey(sportKey, custom);
    var today = todayStr();
    var happyGain = calcFreeCheckHappyGain(duration);

    function applyRecord(photoDataUrl, photoMeta) {
      var rec = {
        date: today,
        at: new Date().toISOString(),
        sportKey: sportKey,
        sportLabel: sportLabel,
        durationMin: duration,
        steps: steps,
        lat: hasLoc ? loc.lat : null,
        lng: hasLoc ? loc.lng : null,
        photoDataUrl: photoDataUrl || null,
        photoName: (photoMeta && photoMeta.name) || (file ? file.name : null),
        photoOmitted: !!(photoMeta && photoMeta.omitted),
      };
      userData.freeCheckRecords = userData.freeCheckRecords || [];
      userData.freeCheckRecords.push(rec);
      userData.freeCheckInDates = userData.freeCheckInDates || [];
      if (userData.freeCheckInDates.indexOf(today) === -1) userData.freeCheckInDates.push(today);
      userData.lifetimePlayCount = (userData.lifetimePlayCount || 0) + 1;
      userData.happiness = clampHappy(userData.happiness + happyGain);
      persistClosingHappiness();
      saveUserData(currentUser, userData);
      closeFreeCheckModal();
      showRewardModal({ title: '自由打卡成功', points: 0, happy: happyGain });
      renderExercise();
      renderPet();
      renderHomeMoodCard();
    }

    if (file) {
      readImageFileCapped(file, function (url, meta) {
        if (meta && meta.error) {
          showToast('照片读取失败，请重试');
          return;
        }
        applyRecord(url, meta);
      });
    } else {
      applyRecord(null, {});
    }
  }

  function getShopFilter() {
    var q = document.getElementById('shopSearch');
    return (q && q.value.trim().toLowerCase()) || '';
  }

  function renderShop() {
    var list = document.getElementById('shopList');
    if (!list) return;
    list.innerHTML = '';
    var q = getShopFilter();
    var order = ['snack', 'toy', 'home', 'dress'];
    order.forEach(function (cat) {
      var items = SHOP_ITEMS.filter(function (it) {
        return it.category === cat && (!q || it.name.toLowerCase().indexOf(q) !== -1);
      });
      if (!items.length) return;
      var sec = document.createElement('section');
      sec.className = 'shop-section';
      sec.innerHTML = '<h3 class="shop-section__title">' + SHOP_CATEGORY_LABEL[cat] + '</h3><div class="shop-grid"></div>';
      var grid = sec.querySelector('.shop-grid');
      items.forEach(function (item) {
        var card = document.createElement('div');
        card.className = 'shop-card';
        var badges =
          '<span class="shop-tag shop-tag--' +
          (item.rarity || 'normal') +
          '">' +
          rarityLabel(item.rarity) +
          '</span>' +
          (item.campus ? '<span class="shop-tag shop-tag--campus">校园限定</span>' : '');
        card.innerHTML =
          '<div class="shop-card__badges">' +
          badges +
          '</div><div class="shop-card__art">' +
          (item.art || '🎁') +
          '</div><div class="shop-card__name">' +
          escapeHtml(item.name) +
          '</div><div class="shop-card__price">' +
          item.price +
          ' 积分</div><button type="button" class="btn btn-shop-buy" data-buy="' +
          item.id +
          '">立即兑换</button>';
        grid.appendChild(card);
      });
      list.appendChild(sec);
    });
    list.querySelectorAll('[data-buy]').forEach(function (b) {
      b.onclick = function () {
        buyItem(b.getAttribute('data-buy'));
      };
    });
  }

  function typeLabel(t) {
    var map = { snack: '零食', toy: '玩具', bed: '窝', collar: '项圈', outfit: '装扮' };
    return map[t] || t;
  }

  function buyItem(id) {
    refreshDayState();
    var item = getShopItem(id);
    if (!item) return;
    if (userData.points < item.price) {
      showToast('积分不够啦，多完成运动计划吧～');
      return;
    }
    userData.points -= item.price;
    userData.backpack[id] = (userData.backpack[id] || 0) + 1;
    saveUserData(currentUser, userData);
    showPetCornerBubble('兑换成功！「' + item.name + '」已放进背包啦～');
    var hp = document.getElementById('headerPoints');
    if (hp) hp.textContent = '积分 ' + userData.points;
    var shopBal = document.getElementById('shopBalance');
    if (shopBal) shopBal.textContent = String(userData.points);
    renderShop();
  }

  function renderBag() {
    var list = document.getElementById('bagList');
    if (!list) return;
    list.innerHTML = '';
    var keys = Object.keys(userData.backpack || {}).filter(function (k) {
      return userData.backpack[k] > 0;
    });
    if (!keys.length) {
      list.innerHTML = '<p class="empty-hint">背包是空的，去逛逛商城吧～</p>';
      renderEquippedSummary();
      return;
    }
    keys.forEach(function (kid) {
      var item = getShopItem(kid);
      if (!item) return;
      var count = userData.backpack[kid];
      var div = document.createElement('div');
      div.className = 'bag-dress-cell';
      var action = item.type === 'snack' ? '一键喂食' : '穿戴 / 使用';
      div.innerHTML =
        '<div class="bag-dress-cell__art">' +
        (item.art || '✨') +
        '</div><div class="bag-dress-cell__name">' +
        escapeHtml(item.name) +
        '</div><div class="bag-dress-cell__cnt">×' +
        count +
        '</div><button type="button" class="bag-dress-cell__btn" data-use="' +
        kid +
        '">' +
        action +
        '</button>';
      list.appendChild(div);
    });
    list.querySelectorAll('[data-use]').forEach(function (b) {
      b.onclick = function () {
        useFromBag(b.getAttribute('data-use'));
      };
    });
    renderEquippedSummary();
  }

  function openBagPanel() {
    if (!userData.petType) {
      showToast('请先完成领养');
      return;
    }
    refreshDayState();
    renderBag();
    document.getElementById('panelBag').classList.add('is-open');
    var bd = document.getElementById('panelBagBackdrop');
    if (bd) bd.classList.add('is-open');
    updateBodyScrollLock();
  }

  function closeBagPanel() {
    document.getElementById('panelBag').classList.remove('is-open');
    var bd = document.getElementById('panelBagBackdrop');
    if (bd) bd.classList.remove('is-open');
    updateBodyScrollLock();
  }

  function renderEquippedSummary() {
    var el = document.getElementById('equippedSummary');
    if (!el) return;
    var e = userData.equipped;
    var parts = [];
    if (e.collar) parts.push('项圈：' + (getShopItem(e.collar) || {}).name);
    if (e.outfit) parts.push('装扮：' + (getShopItem(e.outfit) || {}).name);
    if (e.toy) parts.push('玩具：' + (getShopItem(e.toy) || {}).name);
    if (e.bed) parts.push('窝：' + (getShopItem(e.bed) || {}).name);
    el.textContent = parts.length ? '当前穿戴：' + parts.join(' · ') : '还没有穿戴装扮，点下方道具一键穿戴～';
  }

  function useFromBag(id) {
    refreshDayState();
    var item = getShopItem(id);
    if (!item || !(userData.backpack[id] > 0)) return;
    if (item.type === 'snack') {
      userData.backpack[id] -= 1;
    }
    if (item.type === 'snack') {
      userData.happiness = clampHappy(userData.happiness + (item.happyBonus || 8));
      showPetCornerBubble('嗷呜～' + (item.mood || '幸福值 up！'));
    } else if (item.type === 'collar') {
      userData.equipped.collar = id;
      showPetCornerBubble('项圈戴好，今天也要萌萌哒～');
    } else if (item.type === 'outfit') {
      userData.equipped.outfit = id;
      showPetCornerBubble('换装完成！超适合你～');
    } else if (item.type === 'toy') {
      userData.equipped.toy = id;
      userData.happiness = clampHappy(userData.happiness + 3);
      showPetCornerBubble(item.mood || '一起玩！');
    } else if (item.type === 'bed') {
      userData.equipped.bed = id;
      showPetCornerBubble('小窝布置好啦，好温馨～');
    }
    persistClosingHappiness();
    saveUserData(currentUser, userData);
    renderBag();
    renderPet();
    renderHomeMoodCard();
  }

  function countExerciseDays() {
    var n = 0;
    var o = userData.planCompletionsByDate || {};
    Object.keys(o).forEach(function (k) {
      if (/^\d{4}-\d{2}-\d{2}$/.test(k) && Array.isArray(o[k]) && o[k].length) n++;
    });
    return n;
  }

  function countOwnedItems() {
    var s = 0;
    Object.keys(userData.backpack || {}).forEach(function (k) {
      s += userData.backpack[k] || 0;
    });
    return s;
  }

  function renderProfile() {
    document.getElementById('profileName').textContent = currentUser;
    var petEmoji = userData.petType === 'cat' ? '🐱' : userData.petType === 'dog' ? '🐶' : '🐾';
    document.getElementById('profileAvatarEmoji').textContent = petEmoji;
    document.getElementById('profilePet').textContent =
      userData.petType === 'cat' ? '我的小伙伴 · 小猫咪' : userData.petType === 'dog' ? '我的小伙伴 · 小狗狗' : '—';
    document.getElementById('profileStreak').textContent =
      '连续满幸福值 ' + (userData.streak100 || 0) + ' 天（每日结束时幸福值需为 100）';
    document.getElementById('statExerciseDays').textContent = String(countExerciseDays());
    document.getElementById('statStreak').textContent = String(userData.streak100 || 0);
    document.getElementById('statItems').textContent = String(countOwnedItems());
    var sl = document.getElementById('statLevel');
    if (sl) sl.textContent = String(userData.petLevel || 1);
    var grid = document.getElementById('medalGrid');
    grid.innerHTML = '';
    MEDAL_DEFS.forEach(function (m) {
      var unlocked = userData.medals.indexOf(m.id) !== -1;
      var card = document.createElement('div');
      card.className = 'medal-card' + (unlocked ? ' medal-card--unlocked' : ' locked');
      card.innerHTML =
        '<div class="medal-icon">' +
        m.icon +
        '</div><div class="medal-name">' +
        escapeHtml(m.name) +
        '</div><div class="medal-req">连续 ' +
        m.days +
        ' 天</div>';
      grid.appendChild(card);
    });
  }

  function leaderboardScore(row) {
    return row.happy * 1000 + row.level * 50 + row.items;
  }

  function renderSocial() {
    var box = document.getElementById('leaderboardList');
    if (!box || !userData) return;
    var me = {
      name: currentUser + '（我）',
      happy: userData.happiness,
      level: userData.petLevel || 1,
      items: countOwnedItems(),
      isMe: true,
    };
    var rows = LEADERBOARD_SEED.map(function (r) {
      return { name: r.name, happy: r.happy, level: r.level, items: r.items, isMe: false };
    });
    rows.push(me);
    rows.sort(function (a, b) {
      return leaderboardScore(b) - leaderboardScore(a);
    });
    box.innerHTML = '';
    rows.forEach(function (r, i) {
      var row = document.createElement('div');
      row.className = 'lb-row' + (r.isMe ? ' lb-row--me' : '');
      row.innerHTML =
        '<span class="lb-rank">' +
        (i + 1) +
        '</span><span class="lb-name">' +
        escapeHtml(r.name) +
        '</span><span class="lb-stat">幸福' +
        r.happy +
        '</span><span class="lb-stat">Lv.' +
        r.level +
        '</span><span class="lb-stat">道具' +
        r.items +
        '</span>';
      box.appendChild(row);
    });
  }

  function tryQuickFeed() {
    if (!userData.petType) {
      showToast('请先完成领养');
      return;
    }
    refreshDayState();
    var snackIds = SHOP_ITEMS.filter(function (i) {
      return i.type === 'snack';
    }).map(function (i) {
      return i.id;
    });
    for (var i = 0; i < snackIds.length; i++) {
      var sid = snackIds[i];
      if ((userData.backpack[sid] || 0) > 0) {
        useFromBag(sid);
        return;
      }
    }
    showToast('背包里没有零食啦，先去商城兑换吧～');
  }

  function escapeHtml(s) {
    if (!s) return '';
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function showAuth() {
    document.getElementById('appMain').style.display = 'none';
    document.getElementById('authRoot').style.display = 'flex';
  }

  function showApp() {
    document.getElementById('authRoot').style.display = 'none';
    document.getElementById('appMain').style.display = 'block';
    if (userData && currentUser) {
      migrateUserDataFields();
      saveUserData(currentUser, userData);
    }
    if (!userData.petType) {
      openAdoptModal();
    } else {
      switchScreen('home');
    }
  }

  function syncAdoptFromScroll() {
    var carousel = document.getElementById('adoptCarousel');
    if (!carousel) return;
    var max = carousel.scrollWidth - carousel.clientWidth;
    var idx = max <= 0 ? 0 : carousel.scrollLeft < max * 0.45 ? 0 : 1;
    window._adoptChoice = idx === 0 ? 'cat' : 'dog';
    document.querySelectorAll('.adopt-dot').forEach(function (d, i) {
      d.classList.toggle('active', i === idx);
    });
  }

  function openAdoptModal() {
    var modal = document.getElementById('modalAdopt');
    modal.style.display = 'flex';
    modal.classList.add('is-visible');
    updateBodyScrollLock();
    var carousel = document.getElementById('adoptCarousel');
    if (carousel) {
      carousel.scrollLeft = 0;
      window._adoptChoice = 'cat';
      syncAdoptFromScroll();
      carousel.onscroll = function () {
        syncAdoptFromScroll();
      };
    }
  }

  function closeAdoptModal() {
    var modal = document.getElementById('modalAdopt');
    modal.classList.remove('is-visible');
    modal.style.display = 'none';
    updateBodyScrollLock();
  }

  function confirmAdopt() {
    syncAdoptFromScroll();
    if (!window._adoptChoice) {
      showToast('请左右滑动选择小猫或小狗哦');
      return;
    }
    userData.petType = window._adoptChoice;
    userData.happiness = 0;
    userData.totalPlanCompletes = userData.totalPlanCompletes || 0;
    userData.petLevel = computePetLevel();
    userData.lifetimePlayCount = userData.lifetimePlayCount || 0;
    persistClosingHappiness();
    saveUserData(currentUser, userData);
    closeAdoptModal();
    showPetCornerBubble('领养成功！以后多多指教啦～');
    switchScreen('home');
  }

  function bindNav() {
    document.querySelectorAll('.bottom-nav button').forEach(function (b) {
      b.addEventListener('click', function () {
        if (!userData.petType) {
          showToast('请先完成领养');
          return;
        }
        switchScreen(b.dataset.nav);
      });
    });
  }

  function bindForms() {
    var mode = 'login';
    document.querySelectorAll('.auth-tabs button').forEach(function (t) {
      t.addEventListener('click', function () {
        mode = t.dataset.mode;
        document.querySelectorAll('.auth-tabs button').forEach(function (x) {
          x.classList.toggle('active', x.dataset.mode === mode);
        });
      });
    });
    document.getElementById('btnAuth').onclick = function () {
      var u = document.getElementById('inputUser').value.trim();
      var p = document.getElementById('inputPass').value;
      if (!u || !p) {
        showToast('请输入用户名和密码');
        return;
      }
      var users = loadUsers();
      if (mode === 'register') {
        if (users[u]) {
          showToast('用户名已存在');
          return;
        }
        users[u] = { password: p };
        saveUsers(users);
        currentUser = u;
        userData = defaultUserData();
        saveUserData(currentUser, userData);
        localStorage.setItem(STORAGE_SESSION, currentUser);
        showToast('注册成功');
        showApp();
      } else {
        if (!users[u] || users[u].password !== p) {
          showToast('用户名或密码错误');
          return;
        }
        currentUser = u;
        userData = loadUserData(u);
        localStorage.setItem(STORAGE_SESSION, currentUser);
        showApp();
      }
    };

    document.getElementById('btnLogout').onclick = function () {
      persistClosingHappiness();
      saveUserData(currentUser, userData);
      localStorage.removeItem(STORAGE_SESSION);
      currentUser = null;
      userData = null;
      showAuth();
    };

    document.getElementById('btnAddPlan').onclick = function () {
      if (!userData.petType) return;
      var title = document.getElementById('newPlanTitle').value.trim();
      if (!title) {
        showToast('给计划起个名字吧');
        return;
      }
      var sportType = document.getElementById('newPlanSport').value;
      var sportCustomEl = document.getElementById('newPlanSportCustom');
      var sportCustom =
        sportType === 'other' && sportCustomEl ? String(sportCustomEl.value || '').trim() : '';
      if (sportType === 'other' && !sportCustom) {
        showToast('请填写自定义运动类型');
        return;
      }
      var mode = document.getElementById('newPlanMode').value;
      var reward = parseInt(document.getElementById('newPlanReward').value, 10) || 10;
      var weeklyTarget = parseInt(document.getElementById('newPlanWeekly').value, 10) || 3;
      userData.plans.push({
        id: uid(),
        title: title,
        mode: mode,
        sportType: sportType,
        sportCustom: sportType === 'other' ? sportCustom : '',
        reward: Math.min(50, Math.max(5, reward)),
        weeklyTarget: Math.min(7, Math.max(1, weeklyTarget)),
      });
      document.getElementById('newPlanTitle').value = '';
      if (sportCustomEl) sportCustomEl.value = '';
      var npcw = document.getElementById('newPlanSportCustomWrap');
      if (npcw) npcw.style.display = 'none';
      saveUserData(currentUser, userData);
      showToast('计划已创建');
      renderExercise();
    };

    var newPlanSportEl = document.getElementById('newPlanSport');
    var newPlanSportCustomWrap = document.getElementById('newPlanSportCustomWrap');
    if (newPlanSportEl && newPlanSportCustomWrap) {
      newPlanSportEl.addEventListener('change', function () {
        newPlanSportCustomWrap.style.display = newPlanSportEl.value === 'other' ? 'block' : 'none';
      });
    }

    var freeSportTypeEl = document.getElementById('freeSportType');
    var freeSportCustomWrap = document.getElementById('freeSportCustomWrap');
    if (freeSportTypeEl && freeSportCustomWrap) {
      freeSportTypeEl.addEventListener('change', function () {
        freeSportCustomWrap.style.display = freeSportTypeEl.value === 'other' ? 'block' : 'none';
      });
    }

    var freePhotoEl = document.getElementById('freePhoto');
    if (freePhotoEl) {
      freePhotoEl.addEventListener('change', function () {
        var f = this.files && this.files[0];
        var pn = document.getElementById('freePhotoName');
        if (pn) pn.textContent = f ? f.name : '';
      });
    }

    document.getElementById('btnFreeCheckLoc').onclick = function () {
      if (!navigator.geolocation) {
        showToast('当前浏览器不支持定位');
        return;
      }
      showToast('正在获取位置…');
      navigator.geolocation.getCurrentPosition(
        function (pos) {
          window._freeCheckLoc = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };
          var lr = document.getElementById('freeLocResult');
          if (lr) {
            lr.textContent =
              '已记录位置：' +
              pos.coords.latitude.toFixed(5) +
              '，' +
              pos.coords.longitude.toFixed(5);
          }
        },
        function (err) {
          showToast('定位失败，请检查权限或稍后重试');
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 60000 }
      );
    };

    document.getElementById('btnFreeCheckCancel').onclick = closeFreeCheckModal;
    document.getElementById('btnFreeCheckSubmit').onclick = submitFreeCheckin;

    var planPhotoEl = document.getElementById('planVerifyPhoto');
    if (planPhotoEl) {
      planPhotoEl.addEventListener('change', function () {
        var f = this.files && this.files[0];
        var pn = document.getElementById('planVerifyPhotoName');
        if (pn) pn.textContent = f ? f.name : '';
      });
    }
    var btnPlanLoc = document.getElementById('btnPlanVerifyLoc');
    if (btnPlanLoc) {
      btnPlanLoc.onclick = function () {
        if (!navigator.geolocation) {
          showToast('当前浏览器不支持定位');
          return;
        }
        showToast('正在获取位置…');
        navigator.geolocation.getCurrentPosition(
          function (pos) {
            window._planVerifyLoc = {
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            };
            var lr = document.getElementById('planVerifyLocResult');
            if (lr) {
              lr.textContent =
                '已记录位置：' +
                pos.coords.latitude.toFixed(5) +
                '，' +
                pos.coords.longitude.toFixed(5);
            }
          },
          function () {
            showToast('定位失败，请检查权限或稍后重试');
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 60000 }
        );
      };
    }
    var btnPlanCancel = document.getElementById('btnPlanVerifyCancel');
    if (btnPlanCancel) btnPlanCancel.onclick = closePlanVerifyModal;
    var btnPlanSubmit = document.getElementById('btnPlanVerifySubmit');
    if (btnPlanSubmit) btnPlanSubmit.onclick = submitPlanVerify;

    document.getElementById('btnFreeCheckin').onclick = openFreeCheckModal;
    document.getElementById('btnConfirmAdopt').onclick = confirmAdopt;
    document.getElementById('btnRewardOk').onclick = closeRewardModal;
    document.getElementById('btnMedalOk').onclick = function () {
      clearTimeout(showNextMedalPopup._t);
      closeMedalModal();
      showNextMedalPopup();
    };
    document.getElementById('btnCloseBag').onclick = closeBagPanel;
    var bagBd = document.getElementById('panelBagBackdrop');
    if (bagBd) bagBd.addEventListener('click', closeBagPanel);
    document.getElementById('btnGoExercise').onclick = function () {
      switchScreen('exercise');
    };
    document.getElementById('btnQuickShop').onclick = function () {
      switchScreen('shop');
    };
    document.getElementById('btnQuickFeed').onclick = tryQuickFeed;
    document.getElementById('btnOpenBagHome').onclick = openBagPanel;
    document.getElementById('btnOpenBagProfile').onclick = openBagPanel;
    document.getElementById('btnOpenSocial').onclick = function () {
      switchScreen('social');
    };
    document.getElementById('shopSearch').addEventListener('input', function () {
      renderShop();
    });
    document.getElementById('btnRules').onclick = function () {
      document.getElementById('modalRules').style.display = 'flex';
      document.getElementById('modalRules').classList.add('is-visible');
      updateBodyScrollLock();
    };
    document.getElementById('btnRulesClose').onclick = function () {
      document.getElementById('modalRules').classList.remove('is-visible');
      document.getElementById('modalRules').style.display = 'none';
      updateBodyScrollLock();
    };
    document.getElementById('btnSettings').onclick = function () {
      showToast('设置：本地数据已保存在本浏览器，清除站点数据会重置哦');
    };

    window.addEventListener('beforeunload', function () {
      if (currentUser && userData) {
        persistClosingHappiness();
        saveUserData(currentUser, userData);
      }
    });
  }

  function init() {
    bindNav();
    bindForms();
    var sess = localStorage.getItem(STORAGE_SESSION);
    if (sess && loadUsers()[sess]) {
      currentUser = sess;
      userData = loadUserData(sess);
      showApp();
    } else {
      showAuth();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
