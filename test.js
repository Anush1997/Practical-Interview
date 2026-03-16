
//message extract and pasre
function parseSwiftMessage(rawMessage) {
  const results = [];

  const messageBlocks = rawMessage.split(/(?=\s+25:\s+Account Identification)/);

  for (const block of messageBlocks) {
    const accountMatch = block.match(/25:\s+Account Identification\s+(\d+)/);
    if (!accountMatch) continue;

    const statementMatch = block.match(/28C:\s+Statement Number\/Sequence Number\s+([\d\/]+)/);

    const referenceMatches = [...block.matchAll(/\d{6}\s+\d{4}\s+[DC]\s+\w+\s+([\w\/-]+)\s+#/g)];

    results.push({
      accountId: accountMatch[1],
      statementNumber: statementMatch ? statementMatch[1] : "N/A",
      references: referenceMatches.map(m => m[1]),
    });
  }

  return results;
}

function formatOutput(parsedData) {
  return parsedData.map(entry => {
    const refs = entry.references
      .map((ref, i) => `Reference${i + 1} : ${ref}`)
      .join("\n\n");

    return (
      `Account Identification: ${entry.accountId}\n\n` +
      `Statement Number/Sequence Number: ${entry.statementNumber}\n\n` +
      `${refs}`
    );
  }).join("\n\n\n");
}

const rawMessage = `
22/11/25-20:23:33	            ABCDISK-6625-000005 	 1
	--------------------------- Message Text ---------------------------	
        20: Transaction Reference Number
            XY2112211379-01
        25: Account Identification
            21245870000
       28C: Statement Number/Sequence Number
            00024/00001
        61: Statement Line
            Value  Entr F Code Reference                      Amount        Ma
            211125 1125 D FMSC ABC-SW-20683/21                  #50.00#     DR
                               BABCS002245605
                               CABYLKLXXXX       PAYMENT FEE
            211125 1125 D FMSC ABC/TT/21/50235                  #25.00#     D
                               BABCPS0022456360
                               CABYLKLXXXX       PAYMENT FEE
            211125 1125 D FMSC ABC/TT/21/50354                  #35.00#     C
                               BABCPS0022456449
                               CABYLKLXXXX       PAYMENT FEE
            211125 1125 D FMSC ABC-SW-20383/21                 #588.11#     D
                               BABCPS0022456205
                               CABYLKLXXXX       NORTH MANUFACTUR
	
	--------------------------- Message Text ---------------------------	
        20: Transaction Reference Number
            XY2112211379-01
        25: Account Identification
            21245870001
       28C: Statement Number/Sequence Number
            00025/00001
        61: Statement Line
            Value  Entr F Code Reference                      Amount        Ma
            211125 1125 D FMSC XYZ-SW-20483/21                  #100.00#     D
                               BXYCS0022457205
                               CXYYLKLXXXX       PAYMENT FEE
            211125 1125 D FMSC XYZ/TT/21/50235                  #125.00#     C
                               BXYCPS0022457360
                               CXTYLKLXXXX       PAYMENT FEE
`;

// ---- Run ----
const parsed = parseSwiftMessage(rawMessage);
const output = formatOutput(parsed);
console.log(output);



//reverse array

let alphebet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

function reverseArr(arr){
    let array = [];
    for(let i = arr.length - 1; i >= 0; i--){
        array.push(arr[i]);
    }
    return array;
}

console.log(reverseArr(alphebet));
