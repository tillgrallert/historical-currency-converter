// Notes on the denominations
// Pound Sterling: £1 = 20s = 240d
// Ottoman Lira: £T1 = Ps 100 = 4000 para
// Ottoman Lira (Ps 123): £T1 = Ps 123 = 4920 para

function funcCurRate (pInput1, pInput2, pCurInput1, pCurInput2) 
{var pInput1, pInput2, pL1, pL2, pD1, pD2, pS1, pS2, pCurInput1, pCurInput2;
    
    pL1 = new Number(pInput1.split('-')[0]);
    pL2 = new Number(pInput2.split('-')[0]);
    pS1 = new Number(pInput1.split('-')[1]);
    pS2 = new Number(pInput2.split('-')[1]);
    pD1 = new Number(pInput1.split('-')[2]);
    pD2 = new Number(pInput2.split('-')[2]);

    var vBaseD1 = funcCurBase(pCurInput1,pL1,pS1,pD1);
    var vBaseD2 = funcCurBase(pCurInput2,pL2,pS2,pD2);
    var vRate = vBaseD2 / vBaseD1;
    
    if (pCurInput1=='Sterling')
    {
        if(pCurInput2=='Ottoman')
        {var vResult = vRate *240 /40;}
        else if(pCurInput2=='Ottoman (123)')
        {var vResult = vRate *240 /40;}
        else if(pCurInput2=='Metric')
        {var vResult = vRate *240 /100;}
        else
        {var vResult = vRate;}
    }
    if (pCurInput1=='Ottoman')
    {
        if(pCurInput2=='Sterling')
        {var vResult = vRate *40 /240;}
        else if(pCurInput2=='Metric')
        {var vResult = vRate *40 /100;}
        else
        {var vResult = vRate;}
    }
    if (pCurInput1=='Ottoman (123)')
    {
        if(pCurInput2=='Sterling')
        {var vResult = vRate *40 /240;}
        else if(pCurInput2=='Metric')
        {var vResult = vRate *40 /100;}
        else
        {var vResult = vRate;}
    }
    if (pCurInput1=='Metric')
    {
        if(pCurInput2=='Ottoman')
        {var vResult = vRate *100 /40;}
        else if(pCurInput2=='Ottoman (123)')
        {var vResult = vRate *240 /40;}
        else if(pCurInput2=='Sterling')
        {var vResult = vRate *100 /240;}
        else
        {var vResult = vRate;}
    }
    

    return vResult
    
}


function funcCurBase (pCurInput, pL, pS, pD) 
   {
      var pCurInput;
      if (pCurInput=='Sterling')
         {var vResult = (pL *240) + (pS *12) + pD;}
      else if (pCurInput=='Ottoman')
         {var vResult = (pL *4000)+ (pS *40) + pD;}
	  else if (pCurInput=='Ottoman (123)')
         {var vResult = (pL *4920)+ (pS *40) + pD;}
      else 
         {var vResult = ((pL*100) + pS) + (pD/100);}
         
   return vResult
}

function funcCurExchange (pCurInput,pInput,pCurTarget,pRate)
    { var pCurInput,pInput,pRate,pL,pS,pD;
 
    pL = new Number(pInput.split('-')[0]);
    pS = new Number(pInput.split('-')[1]);
    pD = new Number(pInput.split('-')[2]);
    
    //vBaseD returns the base at the lowes denomination available (pence, para, cent)
    var vBaseD = funcCurBase(pCurInput,pL,pS,pD)
    
    //vInput returns the base at the highest denomiation (i.e. Pound, Lira, Dollar, etc.)
    if (pCurInput=='Sterling')
    {var vInput = vBaseD/240;}
    else if (pCurInput=='Ottoman')
    {var vInput = vBaseD/4000;}
    else if (pCurInput=='Ottoman (123)')
    {var vInput = vBaseD/4920;}
    else 
    {var vInput = vBaseD/100;}
    
    var vBase = vInput*pRate;
    
    if (pCurTarget=='Ottoman')
    {var vOttoS = Math.floor(vBase);
     var vOttoD = (40* (vBase - vOttoS));
     // limits the number to 2 digits after the comma and rounds them
     var vOttoD1 = parseFloat(Math.round(vOttoD * 100) / 100).toFixed(2);
     var vResult = new String(vOttoS) + '-' + new String(vOttoD1);}
     
     else if (pCurTarget=='Ottoman (123)')
    {var vOttoS = Math.floor(vBase);
     var vOttoD = (40* (vBase - vOttoS));
     // limits the number to 2 digits after the comma and rounds them
     var vOttoD1 = parseFloat(Math.round(vOttoD * 100) / 100).toFixed(2);
     var vResult = new String(vOttoS) + '-' + new String(vOttoD1);}
     
     else if (pCurTarget=='Sterling')
    {var vBritL = Math.floor(vBase);
     var vBritS = Math.floor((vBase - vBritL)*20);
     var vBritD = ((((vBase - vBritL)*20)-vBritS)*12);
     // limits the number to 2 digits after the comma and rounds them
     var vBritD1 = parseFloat(Math.round(vBritD * 100) / 100).toFixed(2);
     var vResult = new String(vBritL) + '-' + new String(vBritS) + '-' + new String(vBritD1);}
     
     else
     {var vResult = vBase;}
     
     return vResult
        
}

function funcCurMetric (pCurInput,pInput)
    {var pCurInput,pInput;
    pL = new Number(pInput.split('-')[0]);
    pS = new Number(pInput.split('-')[1]);
    pD = new Number(pInput.split('-')[2]);
    
    //vBaseD returns the base at the lowes denomination available (pence, para, cent)
    var vBaseD = funcCurBase(pCurInput,pL,pS,pD)
    
    //vResult returns the base at the requested denomiation (i.e. Pound, Piaster (sic), Dollar, etc.)
    if (pCurInput=='Sterling')
    {var vResult = vBaseD/240;}
    else if (pCurInput=='Ottoman')
    //for Lire set 4000, for Ps set 40
    {var vResult = vBaseD/40;}
    else if (pCurInput=='Ottoman (123)')
    //for Lire set 4920, for Ps set 40
    {var vResult = vBaseD/40;}
    else 
    {var vResult = vBaseD/100;}
    
    // limits the number to 2 digits after the comma and rounds them
    var vResult1 = parseFloat(Math.round(vResult * 100) / 100).toFixed(2);
    
    return vResult1
    
}