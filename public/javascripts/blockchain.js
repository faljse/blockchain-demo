function sha256(block, chain) {
  // calculate a SHA256 hash of the contents of the block
  // console.log(getText(block, chain));
  return CryptoJS.SHA256(getText(block, chain));
}

function updateState(block, chain) {
  // set the well background red or green for this block
  if ($('#block' + block + 'chain' + chain + 'hash').val().substr(0, 4) === '0000') {
    $('#block' + block + 'chain' + chain + 'well').removeClass('well-error').addClass('well-success');
  }
  else {
    $('#block' + block + 'chain' + chain + 'well').removeClass('well-success').addClass('well-error');
  }
}

function updateHash(block, chain) {
  // update the SHA256 hash value for this block
  $('#block' + block + 'chain' + chain + 'hash').val(sha256(block, chain));
  updateState(block, chain);
}

function updateChain(block, chain) {
  // update all blocks walking the chain from this block to the end
  for (var x = block; x <= 5; x++) {
    if (x > 1) {
      $('#block' + x + 'chain' + chain + 'previous').val($('#block' + (x - 1).toString() + 'chain' + chain + 'hash').val());
    }
    updateHash(x, chain);
  }
}

var socket = io.connect();

socket.on('recev', function (data) {
  chain = 1;
  block = data.number;

  $('#block'+block+'chain'+chain+'nonce').val(data.nonce);
  $('#block'+block+'chain'+chain+'hash').val(data.result);
  console.log('#block'+ (block+1) +'chain'+chain+'previous')
  $('#block'+ (parseInt(block) + 1) +'chain'+chain+'previous').val(data.result);

  updateState(block, chain);

  // do some shit here to update the data and make it green
  console.log("Getting in receive")
  console.log(data);
});

function mine(block, chain, isChain) {
  var found = false;
  socket.emit('clientData', getText2(block, chain));
  // do some shit here with making it red


  // for (var x = 0; x <= 500000 && !found; x++) {
  // $('#block'+block+'chain'+chain+'nonce').val(x);
  // $('#block'+block+'chain'+chain+'hash').val(sha256(block, chain));
  // if ($('#block'+block+'chain'+chain+'hash').val().substr(0, 4) === '0000') {
  //   found = true;
  //   if (isChain) {
  //     updateChain(block, chain);
  //   }
  //   else {
  //     updateState(block, chain);
  //   }
  // }
  // }
}


