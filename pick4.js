var winningNumbers = [
'6806', 
'0366',
'3063',
'4214',
'3736',
'5054',
'8518',
'9317',
'7900',
'8474',
'5667',
'1571',
'7207',
'5601',
'8120',
'4527',
'8853',
'7052',
'0245',
'7573',
'5219',
'5968',
'5227',
'7957',
'8665',
'5607',
'3521',
'9542',
'5206',
'2204',
'6252',
'1095',
'9604',
'2448',
'8611',
'5778',
'8104',
'3718',
'0485',
'0200',
'8796',
'0486',
'8213',
'6764',
'5285',
'3012',
'0789',
'9790',
'8746',
'7396',
'1714',
'2029',
'3682',
'5251',
'1464',
'6747',
'3119',
'6482',
'5026',
'4337',
'4615',
'7314',
'6004',
'3424',
'7224',
'0655',
'3353',
'7061',
'8363',
'7027',
'2187',
'7058',
'5313',
'7463',
'2704',
'7531',
'9441',
'1668',
'5017',
'7438',
'8420',
'9749',
'0224',
'6202',
'0315',
'9474',
'0259',
'0069',
'7571',
'5612',
'2788',
'5131',
'0190',
'1222',
'6213',
'0384',
'1895',
'5373',
'2217',
'4658',
'0071',
'9346',
'1764',
'1750',
'2115',
'7085',
'5884',
'7807',
'9441',
'9454',
'5104',
'0557',
'6594',
'5085',
'3719',
'9570',
'7772',
'3881',
'6755',
'3481',
'4627',
'5409',
'9089',
'3756',
'0801',
'0801',
'6779',
'7397',
'9222',
'8451',
'7329',
'3021',
'7947',
'9935',
'7027',
'3997',
'0805',
'0696',
'6592',
'9226',
'7387',
'9775',
'4746',
'5483',
'7290',
'2212',
'1058',
'2193',
'7686',
'7330',
'5458',
'4848',
'6371',
'2698',
'6527',
'0943',
'9172',
'6003',
'4079',
'6392',
'8635',
'6469',
'8030',
'3415',
'8993',
'9080',
'9584',
'8788',
'2391',
'5483',
'1497',
'8731',
'0550',
'3885',
'9290',
'5147',
'7096',
'4286',
'7302',
'8745',
'1109',
'0331',
'8112',
'8191',
'2607',
'7111',
'4158',
'8383',
'0488',
'4554',
'2863',
'0827',
'0405',
'3204',
'9275',
'9682',
'0858',
'2540',
'6617',
'6595',
'7453',
'5420',
'6070',
'4828',
'9263',
'8524',
'9946',
'0749',
'3486',
'3853',
'3454',
'3494',
'9241',
'1370',
'1077',
'5693',
'4430',
'3074',
'4147',
'8124',
'3838',
'2660',
'2102',
'4347',
'2968',
'4327',
'7413',
'9150',
'0461',
'8052',
'1335',
'6414',
'9158',
'9795',
'3418',
'7071',
'7332',
'1864',
'0805',
'2159',
'8583',
'3376',
'4802',
'1409',
'8454',
'2171',
'5374',
'7416',
'3401',
'9914',
'8357',
'5246',
'5050',
'1284',
'5715',
'9744',
'1217',
'3014',
'4852',
'1732',
'1661',
'9616',
'3432',
'5469',
'3024',
'5590',
'6382',
'7764',
'1795',
'8385',
'9105',
'0251',
'2057',
'0873',
'9276',
'6186',
'0401',
'1842',
'0692',
'8115',
'4515',
'4364',
'3728',
'9842',
'7548',
'2643',
'2367',
'7317',
'3449',
'8670',
'0588',
'6756',
'5284',
'0805',
'0014',
'2118',
'7238',
'4757',
'2961',
'9868',
'8472',
'6411',
'0543',
'5338',
'1741',
'7247',
'3652',
'3784',
'5513',
'1834',
'5073',
'0407',
'4546',
'9088',
'8220',
'0136',
'5253',
'3031',
'2118',
'9600',
'3879',
'0669',
'2504',
'0146',
'8399',
'4632',
'7412',
'0000',
'9720',
'1474',
'1651',
'7622',
'2241',
'5346',
'6004',
'0233',
'3896',
'4684',
'3041',
'6045',
'2605',
'5454',
'5372',
'3443',
'1327',
'0950',
'3748',
'5638',
'4574',
'4477',
'7487',
'4833',
'1946',
'8775',
'9620',
'0249',
'3872',
'3279',
'0416',
'6693',
'4075',
'6575',
'6444'
];

var ones = [];
var tens = [];
var hundreds = [];
var thousands = [];

for(i=0; i<winningNumbers.length; i++){

	var w = winningNumbers[i].charAt(0);
	w = parseInt(w);

	var x = winningNumbers[i].charAt(1);
	x = parseInt(x);

	var y = winningNumbers[i].charAt(2);
	y = parseInt(y);

	var z = winningNumbers[i].charAt(3);
	z = parseInt(z);

	ones.push(w);
	tens.push(x);
	hundreds.push(y);
	thousands.push(z);
}

var sum1 = 0;
var sum2 = 0;
var sum3 = 0;
var sum4 = 0;
var onesAvg;
var tensAvg;
var hundredsAvg;
var thousandsAvg;


function calculateAvg(){

	for(j=0; j<ones.length; j++){
		sum1 += ones[j];
}
	for(k=0; k<tens.length; k++){
		sum2 += tens[k];
}
	for(l=0; l<hundreds.length; l++){
		sum3 += hundreds[l];
}
	for(m=0; m<thousands.length; m++){
		sum4 += thousands[m];
}
	onesAvg = (sum1 / ones.length);
	tensAvg = (sum2 / tens.length);
	hundredsAvg = (sum3 / hundreds.length);
	thousandsAvg = (sum4 / thousands.length);
	
	console.log('The average of numbers between 0 and 9 is: 4.5')
	console.log('The average first number picked is: ' + onesAvg);
	console.log('The average second number picked is: ' + tensAvg);
	console.log('The average third number picked is: ' + hundredsAvg);
	console.log('The average fourth number picked is: ' + thousandsAvg);

}

calculateAvg();
