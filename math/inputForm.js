  const mathField = document.getElementById('mathfield');
  // 帯分数入力中かどうかを判定するフラグ
  let inMixedFractionMode = false;

  function insertDigit(digit) {
    mathField.executeCommand('insert', digit);
  }
  
  // ÷ボタンの動作：
  function handleDivision() {
    if(inMixedFractionMode==1){
      mathField.executeCommand('moveToNextPlaceholder');
    }else{
      let latex = mathField.getValue('latex');
      if(latex==""){
        mathField.executeCommand('insert', `\\dfrac{\\placeholder{}}{\\placeholder{}}`);
      }else{
        let match = latex.match(/(\d+(\.\d+)?)$/);

        // 分母に \placeholder() を入れて分子部分には取得した数字を利用
        mathField.setValue('');
        mathField.executeCommand('insert', `\\dfrac{${match[1]}}{\\placeholder{}}`);
        // カーソルを分母のプレースホルダーへ移動
        mathField.executeCommand('moveToNextPlaceholder');
      }
    }
  }
  
  // 帯分数ボタンの動作：
  // 既に入力済みの整数部分はそのままに、分数部分の空テンプレートを追加
  function insertMixedFraction() {
      let latex = mathField.getValue('latex');
      if(latex==""){
        mathField.executeCommand('insert', `\\placeholder+\\dfrac{\\placeholder{}}{\\placeholder{}}`);
      }else{
        inMixedFractionMode=1
        let latex = mathField.getValue('latex');
        mathField.executeCommand('insert', `\\dfrac{\\placeholder{}}\\placeholder{}{}`);
      }
  }
  
  // フィールドをクリア
  function clearField() {
    mathField.setValue('');
    inMixedFractionMode = false;
  }
  
  // 決定ボタン：MathFieldの内容をLaTeX形式に変換してアラートで表示
  function commitInput() {
    const latexOutput = mathField.getValue('latex');
    alert("LaTeX出力:\n" + latexOutput);
    return latexOutput;
  }
