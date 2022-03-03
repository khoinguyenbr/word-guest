(function () {
  /** CONSTANT */
  const COUNT_FROM = new Date('2022-02-10');
  const COUNT_EACH_DAY = 26;
  const COUNT_MAX = 33;
  const COUNT_MIN = 23;
  const STEPS = 6;
  const WORDS_LIST = [
    'CÂY',
    'HOA',
    'BAY',
    'CẤN',
    'HÔN',
    'TÁM',
    'BƠI',
    'MÀU',
    'CHÓ',
    'MÈO',
    'TÚI',
    'BÚT',
    'LỬA',
    'SẤM',
    'ĐẤT',
    'THÚ',
    'DÂY',
    'RÈM',
    'BÀN',
  ];

  // const signArr = ['_', '\xB4', '`', '?', '~', '.'];
  // const CharSignMap = {
  //   A: ['A', 'Á', 'À', 'Ả', 'Ã', 'Ạ'],
  //   Â: ['Â', 'Ấ', 'Ầ', 'Ẩ', 'Ẫ', 'Ậ'],
  //   Ă: ['Ă', 'Ắ', 'Ằ', 'Ẳ', 'Ẵ', 'Ặ'],
  //   E: ['E', 'É', 'È', 'Ẻ', 'Ẽ', 'Ẹ'],
  //   Ê: ['Ê', 'Ế', 'Ề', 'Ể', 'Ễ', 'Ệ'],
  //   I: ['I', 'Í', 'Ì', 'Ỉ', 'Ĩ', 'Ị'],
  //   O: ['O', 'Ó', 'Ò', 'Ỏ', 'Õ', 'Ọ'],
  //   Ô: ['Ô', 'Ố', 'Ồ', 'Ổ', 'Ỗ', 'Ộ'],
  //   Ơ: ['Ơ', 'Ớ', 'Ờ', 'Ở', 'Ỡ', 'Ợ'],
  //   U: ['U', 'Ú', 'Ù', 'Ủ', 'Ũ', 'Ụ'],
  //   Ư: ['Ư', 'Ứ', 'Ừ', 'Ử', 'Ữ', 'Ự'],
  //   Y: ['Y', 'Ý', 'Ỳ', 'Ỷ', 'Ỹ', 'Ỵ'],
  // };

  const signArr = ['\xB4', '`', '?', '~', '.'];
  const CharSignMap = {
    A: ['Á', 'À', 'Ả', 'Ã', 'Ạ'],
    Â: ['Ấ', 'Ầ', 'Ẩ', 'Ẫ', 'Ậ'],
    Ă: ['Ắ', 'Ằ', 'Ẳ', 'Ẵ', 'Ặ'],
    E: ['É', 'È', 'Ẻ', 'Ẽ', 'Ẹ'],
    Ê: ['Ế', 'Ề', 'Ể', 'Ễ', 'Ệ'],
    I: ['Í', 'Ì', 'Ỉ', 'Ĩ', 'Ị'],
    O: ['Ó', 'Ò', 'Ỏ', 'Õ', 'Ọ'],
    Ô: ['Ố', 'Ồ', 'Ổ', 'Ỗ', 'Ộ'],
    Ơ: ['Ớ', 'Ờ', 'Ở', 'Ỡ', 'Ợ'],
    U: ['Ú', 'Ù', 'Ủ', 'Ũ', 'Ụ'],
    Ư: ['Ứ', 'Ừ', 'Ử', 'Ữ', 'Ự'],
    Y: ['Ý', 'Ỳ', 'Ỷ', 'Ỹ', 'Ỵ'],
  };
  /** END CONSTANT ================== */

  const $keyboard = $('#keyboard');
  const $wordSection = $('#words');
  const $overlay = $('#overlay');
  const $modal = $('#modal');

  const delay = (ms) => {
    return new Promise((res) =>
      setTimeout(() => {
        res();
      }, ms)
    );
  };

  const getMobileOS = () => {
    const ua = navigator.userAgent;

    if (/android/i.test(ua)) {
      return 'Android';
    } else if (
      /iPad|iPhone|iPod/.test(ua) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
    ) {
      return 'iOS';
    }
    return 'Other';
  };

  /* INIT LAYOUT */

  const classKeyActive = 'bg-grey-light hover:border-grey-lighter';
  const classKeyDisabled = 'disabled bg-grey-dark';

  function getCharWithSign(char, sign) {
    const signPos = signArr.indexOf(sign);

    const newChar = CharSignMap[char]
      ? CharSignMap[char][signPos < 0 ? 0 : signPos]
      : char;
    return newChar;
  }

  function getSignFromChar(char) {
    const keys = Object.keys(CharSignMap);

    for (let k of keys) {
      const index = CharSignMap[k].indexOf(char);
      if (index > -1) {
        return signArr[index];
      }
    }
    return '_';
  }

  function removeSign(char) {
    const keys = Object.keys(CharSignMap);
    for (let k of keys) {
      if (CharSignMap[k].includes(char)) {
        return k;
      }
    }
    return char;
  }

  function compareOriginCharacter(char1, char2) {
    const removeSign1 = removeSign(char1);
    const removeSign2 = removeSign(char2);
    return removeSign1 === removeSign2;
  }

  function initKeyboard() {
    const lines = [
      ['A', 'Ă', 'Â', 'B', 'C', 'D', 'Đ', 'E', 'Ê', 'G'],
      ['H', 'I', 'K', 'L', 'M', 'N', 'O', 'Ô', 'Ơ'],
      ['P', 'Q', 'R', 'S', 'T', 'U', 'Ư', 'V', 'X', 'Y'],
    ];
    const classes =
      'rounded lg:rounded-xl text-white text-center font-medium lg:border-2 border-grey-light hover:border-gray-lighter transition cursor-pointer bg-grey-light active:bg-grey-lighter';

    const $ul = $('<ul class="w-full space-y-2 lg:space-y-4"></ul>');

    const $signLine = $(
      '<li class="flex space-x-2 lg:space-x-4 justify-center flex-wrap"></li>'
    );
    const signEls = signArr.map(
      (sign) => `<div class="sign ${classes}">${sign}</div>`
    );
    $signLine.append(signEls);

    const $lines = lines.map((line) => {
      const $line = $(
        '<li class="flex space-x-2 lg:space-x-4 justify-center flex-wrap"></li>'
      );
      const keys = line.map(
        (key) => `<div class="key ${classes}">${key}</div>`
      );
      $line.append(keys);
      return $line;
    });

    $ul.append($signLine);
    $ul.append($lines);
    $keyboard.append($ul);
    $keyboard.append(`<div class="actions flex justify-center w-full my-4 space-x-8">
    <div id="enter" class="key func ${classes}">ENTER</div>
    <div id="delete" class="key func ${classes}">DELETE</div>
    </div>`);

    $('#enter').addClass(classKeyDisabled).removeClass(classKeyActive);

    setTimeout(() => {
      const margin = parseInt($wordSection.css('margin-top')) * 2;
      $wordSection.height(
        window.innerHeight -
          $keyboard.height() -
          $wordSection.offset().top -
          margin
      );
    }, 200);
  }

  $(window).on('resize orientationchange', function () {
    setTimeout(() => {
      const margin = parseInt($wordSection.css('margin-top')) * 2;
      $wordSection.height(
        window.innerHeight -
          $keyboard.height() -
          $wordSection.offset().top -
          margin
      );
    }, 200);
  });

  function initWord() {
    const history = Cookies.get('history') || '';
    const pastWords = history.split('_');
    if (pastWords.length === WORDS_LIST.length) {
      Cookies.set('history', '');
      return WORDS_LIST[Math.floor(Math.random() * WORDS_LIST.length)];
    }

    const leftWords = WORDS_LIST.filter((word) => !pastWords.includes(word));

    if (leftWords.length === 0) {
      Cookies.set('history', '');
      return WORDS_LIST[Math.floor(Math.random() * WORDS_LIST.length)];
    }

    return leftWords[Math.floor(Math.random() * leftWords.length)];
  }

  function initLines(word) {
    const $listWrapper = $wordSection.children();
    for (let i = 0; i < STEPS; i++) {
      const $listItem = $('<li class="flex space-x-4"></li>');
      for (let j = 0; j < word.length; j++) {
        $listItem.append(
          `<div class="relative text-white w-16 h-16 lg:w-20 lg:h-20 rounded-lg font-bold border-2 ${
            i !== 0 ? 'border-grey-default' : 'border-grey-light'
          } text-xl lg:text-3xl flex justify-center items-center">
          </div>`
        );
      }
      $listWrapper.append($listItem);
    }
  }

  function showResult(isWin) {
    $('#result').text(todayWord).removeClass('hidden');
    $keyboard.addClass('hidden');
    isDone = true;

    if (!isWin) return;

    setTimeout(() => {
      $modal.add($overlay).removeClass('hidden');
    }, 1500);
  }

  function getToday() {
    const today = new Date();
    return `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
  }

  function checkAvailableTurn() {
    const historyDays = Cookies.get('days') || '';
    const today = getToday();
    return !historyDays.includes(today);
  }

  initKeyboard();
  const todayWord = initWord();
  initLines(todayWord);

  /* GAME LOGIC */
  let isDone = false;
  let currentLine = 0;
  let currentChar = 0;
  let willNext = false;
  let isWin = false;

  function getTotalCount() {
    const numOfDaysFromStart = dateFns.differenceInCalendarDays(
      new Date(),
      COUNT_FROM
    );
    const numOfTurnsToday =
      Math.floor(Math.random() * (COUNT_MAX - COUNT_MIN + 1)) + COUNT_MIN;

    $modal.find('.count-total').text(COUNT_EACH_DAY * numOfDaysFromStart + 'k');
    $modal.find('.count-day').text(numOfTurnsToday + 'k');
  }

  function formatTime(time) {
    const hrs = ~~(time / 3600);
    const mins = ~~((time % 3600) / 60);
    const secs = ~~time % 60;

    function leadZero(num) {
      return `0${num}`.slice(-2);
    }

    if (hrs === 0 && mins === 0) {
      return leadZero(secs);
    }

    if (hrs === 0) {
      return `${leadZero(mins)}:${leadZero(secs)}`;
    }

    return `${leadZero(hrs)}:${leadZero(mins)}:${leadZero(secs)}`;
  }

  function getCountDown() {
    const current = new Date();
    const endOfDay = dateFns.endOfDay(current);
    const secondsLeft = dateFns.differenceInSeconds(endOfDay, current);
    return formatTime(secondsLeft);
  }

  const getCell = (idx = currentChar) =>
    $wordSection.find('li').eq(currentLine).find('div').eq(idx);

  function updateCurrentChar(idx) {
    const activeClasses = 'border-4';
    const inactiveClasses = 'border';
    const $line = $wordSection.find('li').eq(currentLine);

    currentChar = idx;
    $line.children().removeClass(activeClasses).addClass(inactiveClasses);
    $line
      .children()
      .eq(idx)
      .removeClass(inactiveClasses)
      .addClass(activeClasses);
  }

  function updateCurrentLine(idx) {
    const lines = $wordSection.find('li');
    lines
      .eq(idx)
      .find('div')
      .removeClass('border-grey-light')
      .addClass('border-gray-400');

    currentLine = idx;
    updateCurrentChar(0);

    $wordSection.animate(
      {
        scrollTop: lines.eq(idx).position().top - 60 + $wordSection.scrollTop(),
      },
      300
    );
  }

  function checkSignExist(sign) {
    for (let char of [...todayWord]) {
      if (getSignFromChar(char) === sign) {
        return true;
      }
    }
    return false;
  }

  async function sharing(lines = 6, isWin = false) {
    let template =
      '<section class="flex justify-start items-center flex-col p-4">';
    const block1 = '<div class="w-10 h-10 bg-grey-default rounded-md"></div>';
    const block2 = '<div class="w-10 h-10 bg-yellow rounded-md"></div>';
    const block3 = '<div class="w-10 h-10 bg-green rounded-md"></div>';
    const $lines = $wordSection.find('li');

    template += `<p class="text-center text-grey-dark"><span class="text-green font-bold">VNWORDLE</span> ${
      isWin ? lines : 'X'
    }/6</p>`;
    template += '<ul class="p-4 space-y-2">';

    console.log('share');

    for (let l = 0; l < lines; l++) {
      const $line = $lines.eq(l);
      const $cells = $line.find('div');

      template += '<li class="flex space-x-2">';
      for (let c = 0; c < todayWord.length; c++) {
        const $cell = $cells.eq(c);
        if ($cell.hasClass('bg-grey-default')) {
          template += block1;
        } else if ($cell.hasClass('bg-yellow')) {
          template += block2;
        } else {
          template += block3;
        }
      }
      template += '</li>';
    }
    template += '</ul></section>';

    const temp = $wordSection.html();
    $wordSection.html(template);

    await delay(200);

    html2canvas($wordSection.find('section').get(0)).then(async function (
      canvas
    ) {
      try {
        const dataUrl = canvas.toDataURL();
        const blob = await (await fetch(dataUrl)).blob();
        const filesArray = [
          new File([blob], 'vnwordleresult.jpg', {
            type: 'image/jpeg',
            // type: blob.type
            // lastModified: new Date().getTime(),
          }),
        ];

        $wordSection.html(temp);

        const shareData = {
          title: `VNWORDLE ${isWin ? lines : 'X'}/6`,
          files: filesArray,
          text: `VNWORDLE ${isWin ? lines : 'X'}/6`,
          // url: SITE_URL,
        };

        const os = getMobileOS();

        if (navigator.share && (os === 'Android' || os === 'iOS')) {
          navigator.share(shareData);
        } else {
          await copyBlobToClipboard(blob);
          $('#copied').removeClass('hidden');
          await delay(1000);
          $('#copied').fadeOut();
        }
      } catch (e) {
        console.log({ e });
        console.log('Error in sharing');
      }
    });
  }

  /* GUEST WORD */
  function guestWord() {
    willNext = false;
    const guestLine = $wordSection.find('li').eq(currentLine);
    const guesting = guestLine.text();
    const countCorrect = {};

    [...guesting].forEach((char, index) => {
      const $cell = getCell(index);
      const sign = getSignFromChar(char);
      const countInOrg = todayWord
        .split('')
        .filter((c) => compareOriginCharacter(c, char)).length;
      const countCorrectChar = countCorrect[char] || 0;

      let isNoExistChar = false;

      $cell.removeClass('border border-2 border-4');

      if (compareOriginCharacter(char, todayWord[index])) {
        countCorrect[char] = countCorrectChar + 1;
        $cell.addClass('bg-green');

        if (countInOrg === countCorrect[char]) {
          guestLine
            .find(`div.bg-yellow:contains(${char})`)
            .removeClass('bg-yellow')
            .addClass('bg-grey-default');
        }
      } else if (countInOrg > countCorrectChar) {
        $cell.addClass('bg-yellow');
      } else {
        $cell.addClass('bg-grey-default');

        if (countInOrg === 0) {
          isNoExistChar = true;
          const charWithoutSign = removeSign(char);
          $keyboard
            .find(`div:not(.func):contains(${charWithoutSign})`)
            .addClass(classKeyDisabled)
            .removeClass(classKeyActive);
        }
      }

      if (
        !isNoExistChar &&
        sign !== getSignFromChar(todayWord[index]) &&
        Object.keys(CharSignMap).includes(removeSign(char))
      ) {
        $cell.addClass('error-dot');
      } else {
        $cell.removeClass('error-dot');
      }

      if (!checkSignExist(sign)) {
        $keyboard
          .find(`div:contains(${sign})`)
          .addClass(classKeyDisabled)
          .removeClass(classKeyActive);
      }
    });

    isWin = todayWord === guesting.trim();

    const historyDays = Cookies.get('days') || '';
    const usedWords = Cookies.get('history') || '';

    if (isWin) {
      showResult(true);
      Cookies.set('days', `${historyDays}_${getToday()}`);
      Cookies.set('history', `${usedWords}_${todayWord}`);
      return;
    }

    if (currentLine === STEPS - 1 && !isWin) {
      showResult(false);
      Cookies.set('days', `${historyDays}_${getToday()}`);
      Cookies.set('history', `${usedWords}_${todayWord}`);
      return;
    }

    updateCurrentLine(currentLine + 1);
  }
  /* END GUEST WORD ================== */

  $wordSection.on('click tap', 'li > div', function () {
    const $cell = $(this);
    const $line = $cell.parent();
    willNext = false;
    if ($line.index() === currentLine) {
      updateCurrentChar($(this).index());
    }
  });

  $keyboard.on('click.key tap.key', 'div.key', function () {
    const key = this.innerHTML;
    let $cell = getCell();

    if ($(this).hasClass('disabled') || $(this).hasClass('hold-on')) {
      return;
    }

    const isVowels = Object.keys(CharSignMap).includes(key);

    if (key !== 'ENTER' && key !== 'DELETE') {
      if (willNext) {
        willNext = false;
        updateCurrentChar(currentChar + 1);
        $cell = getCell();
        $signKeys.removeClass('border-2 border-green');
      }
      if (currentChar < todayWord.length - 1 && !isVowels) {
        updateCurrentChar(currentChar + 1);
      } else if (isVowels) {
        $signKeys = $keyboard.find('.sign:not(.disabled)');
        $signKeys.addClass('border-2 border-green');
        willNext = true;

        // $keyboard
        //   .find('.key')
        //   .addClass('hold-on bg-grey-dark')
        //   .removeClass('bg-grey-light');
      }
      $cell.data('origin', key);
      $cell.text(key);
    } else if (key === 'DELETE') {
      willNext = false;
      $signKeys.removeClass('border-2 border-green');
      if ($cell.text().trim()) {
        $cell.text('');
      } else if ($cell.index() > 0) {
        updateCurrentChar(currentChar - 1);
        getCell().text('');
      }
    } else {
      guestWord();
    }

    const $enter = $('#enter');

    if (
      $wordSection.find('li').eq(currentLine).text().trim().length <
      todayWord.length
    ) {
      $enter.addClass(classKeyDisabled).removeClass(classKeyActive);
    } else {
      $enter.removeClass(classKeyDisabled).addClass(classKeyActive);
    }
  });

  $keyboard.on('click tap', 'div.sign', function () {
    const sign = this.innerHTML;
    const $cell = getCell();
    willNext = false;
    $keyboard.find('.sign').removeClass('border-2 border-green');
    const orgKey = $cell.data('origin');
    if (!orgKey || $(this).hasClass('disabled')) {
      return;
    }

    $keyboard
      .find('.key')
      .removeClass('hold-on bg-grey-dark')
      .not('.disabled')
      .addClass('bg-grey-light');

    $cell.text(getCharWithSign(orgKey, sign));

    if (currentChar < todayWord.length - 1) {
      updateCurrentChar(currentChar + 1);
    }
  });

  $('#share').on('click', function () {
    const os = getMobileOS();

    if (isDone) {
      sharing(currentLine + 1, isWin);
      return;
    }

    if (navigator.share && (os === 'Android' || os === 'iOS')) {
      navigator.share({
        title: 'Trò chơi đoán chữ',
        text: 'Nào cùng đoán chữ của ngày hôm nay là gì đây!',
        url: location.href,
      });
    } else {
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${location.href}`,
        '_blank'
      );
    }
  });

  updateCurrentChar(0);
  getTotalCount();

  const intv = setInterval(() => {
    const timeStr = getCountDown();
    $modal.find('.count-down').text(timeStr);

    if (timeStr === '00') {
      location.reload();
    }
  }, 1000);

  if (!checkAvailableTurn()) {
    $overlay.removeClass('hidden');
    $modal.removeClass('hidden');
  }

  // TODO
  console.log(todayWord);
})();
