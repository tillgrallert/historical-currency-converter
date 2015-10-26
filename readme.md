--- 
title: Historical Currency Converter
author: Till Grallert
date: 2013-05-04
---

Conducting historical research, one often encounters odd currencies, measures, and calendars, all of which are bound to space and time. Calender conversion tools can be readily found on the internet (a good example is [CalendarHome](http://www.calendarhome.com/converter/)'s adaptation of [Fourmilab](http://www.fourmilab.ch/documents/calendar/)'s code), but converters for non-metric currencies and weights are a bit trickier to come by. As I found myself repeatedly computing exchange rates between Ottoman Lira, British Pound Sterling, US Dollars, and French Francs, I wrote a simple javascript and html frontend.

The javascript is available on [GitHub](https://github.com/tillgrallert/historical-currency-converter). Check the source of this page to look at the implementation.

## The quick and dirty implementation

These forms are a rough sketch and allow to calculate exchange rates between Pound Sterling, Ottoman Lira, and Metric currencies and to convert any of the three currency types into any other using a supplied rate. The Pound Sterling is computed as £1 = 20s. = <span id="s1"></span>d. and the Ottoman Lira as £T1 = Ps 100 = <span id="s2"></span> Para. When Ottoman is chosen as the output, values are returned on a **piaster (Ps) base**, following the practice of most contemporaneous sources. This was due to the falling silver prices and the resulting limping gold standard of the late nineteenth century. In consequence, and even though the nominal value of £T1 remained Ps 100,the Ottoman empire established an official exchange rate of £T1= Ps 123 in May 1883.
             
Values must be supplied as denominations separated by a dash; i.e. £1 ='1-0-0', Ps 245"20 = '0-245-20' or '2-45-20'. For metric currencies, values are supplied as unit-hundreds-00; i.e. $4.78 = '4-78-00'.

<script type="text/javascript" src="https://rawgithub.com/tillgrallert/historical-currency-converter/master/CurrencyConverter.js"></script>          
<div class="cForm">
    <header>Compute an exchange rate</header>
    <form id="fCurRate" action="javascript:return false;">
        <input class="cAmount" id="iInput1" type="text" value="2-3-5"/>
        <select id="iCurInput1">
            <option>Sterling</option>
            <option>Ottoman</option>
            <option>Ottoman (123)</option>
            <option>Metric</option>
        </select>
        <input class="cAmount" id="iInput2" type="text" value="0-34-28"/>
        <select id="iCurInput2">
            <option>Ottoman</option>
            <option>Ottoman (123)</option>
            <option>Sterling</option>
            <option>Metric</option>
        </select>
        <input type="button" id="b2" value="="/>
        <span id="sResult1"></span>
    </form>
</div>

<div class="cForm">
    <header>Convert amounts using an exchange rate</header>
    <form id="fCurExchange">
        <input class="cAmount" id="iInput3" type="text" value="2-3-5"/>
        <select id="iCurInput3">
            <option>Sterling</option>
            <option>Ottoman</option>
            <option>Ottoman (123)</option>
            <option>Metric</option>
        </select>
        <input class="cRate" id="iRate" type="text" value="15.984644913627639"/>
        <select id="iCurInput4">
            <option>Ottoman</option>
            <option>Ottoman (123)</option>
            <option>Sterling</option>
            <option>Metric</option>
        </select>
        <input type="button" id="b3" value="="/>
        <span id="sResult2"></span>
    </form>
</div>
<div class="cForm">
    <header>Compute metric values for non-metric currencies</header>
    <form id="fCurExchange">
        <input class="cAmount" id="iInput5" type="text" value="0-34-28"/>
        <select id="iCurInput5">
            <option>Ottoman</option>
            <option>Ottoman (123)</option>
            <option>Sterling</option>
            <!-- <option>Metric</option> -->
        </select>
        <input type="button" id="b4" value="="/>
        <span id="sResult3"></span>
    </form>
</div>

<script type="text/javascript">
document.getElementById("s1").innerHTML=funcCurBase('Sterling',1,0,0);
document.getElementById("s2").innerHTML=funcCurBase('Ottoman',1,0,0);
document.getElementById("b2").onclick = function funcCalcRate (){
    var pInput1, pInput2, pCurInput1, pCurInput2;
    
    pInput1 = document.getElementById('iInput1').value;
    pInput2 = document.getElementById('iInput2').value;
    pCurInput1 = document.getElementById('iCurInput1').value;
    pCurInput2 = document.getElementById('iCurInput2').value;
    
    var vResult = funcCurRate (pInput1,pInput2,pCurInput1,pCurInput2);
    
    document.getElementById("sResult1").innerHTML = vResult;
};
document.getElementById("b3").onclick = function funcCalcExchange (){
    var pCurInput,pInput,pCurTarget,pRate;
    
    pCurInput = document.getElementById('iCurInput3').value;
    pInput = document.getElementById('iInput3').value;
    pCurTarget = document.getElementById('iCurInput4').value;
    pRate = document.getElementById('iRate').value;
    
    var vResult = funcCurExchange (pCurInput,pInput,pCurTarget,pRate);
    
    document.getElementById("sResult2").innerHTML = vResult;
};
document.getElementById("b4").onclick = function funcCalcMetric (){
    var pCurInput,pInput;
    
    pCurInput = document.getElementById('iCurInput5').value;
    pInput = document.getElementById('iInput5').value;
    
    var vResult = funcCurMetric (pCurInput,pInput);
    
    document.getElementById("sResult3").innerHTML = vResult;
};
</script> 

