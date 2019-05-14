export class X2JS{
     VERSION = "1.2.0";
		
    config = null;
    DOMNodeTypes = {
        ELEMENT_NODE 	   : 1,
        TEXT_NODE    	   : 3,
        CDATA_SECTION_NODE : 4,
        COMMENT_NODE	   : 8,
        DOCUMENT_NODE 	   : 9
    };
    constructor(){
        this.config={};
        this.initConfigDefaults();
        this.initRequiredPolyfills();
    }

    
     initConfigDefaults() {
         var config=this.config;
        if(config.escapeMode === undefined) {
            config.escapeMode = true;
        }
        
        config.attributePrefix = config.attributePrefix || "_";
        config.arrayAccessForm = config.arrayAccessForm || "none";
        config.emptyNodeForm = config.emptyNodeForm || "text";		
        
        if(config.enableToStringFunc === undefined) {
            config.enableToStringFunc = true; 
        }
        config.arrayAccessFormPaths = config.arrayAccessFormPaths || []; 
        if(config.skipEmptyTextNodesForObj === undefined) {
            config.skipEmptyTextNodesForObj = true;
        }
        if(config.stripWhitespaces === undefined) {
            config.stripWhitespaces = true;
        }
        config.datetimeAccessFormPaths = config.datetimeAccessFormPaths || [];

        if(config.useDoubleQuotes === undefined) {
            config.useDoubleQuotes = false;
        }
        
        config.xmlElementsFilter = config.xmlElementsFilter || [];
        config.jsonPropertiesFilter = config.jsonPropertiesFilter || [];
        
        if(config.keepCData === undefined) {
            config.keepCData = false;
        }
    }

    
     initRequiredPolyfills() {		
    }
    
     getNodeLocalName( node ) {
        var nodeLocalName = node.localName;			
        if(nodeLocalName == null) // Yeah, this is IE!! 
            nodeLocalName = node.baseName;
        if(nodeLocalName == null || nodeLocalName=="") // =="" is IE too
            nodeLocalName = node.nodeName;
        return nodeLocalName;
    }
    
     getNodePrefix(node) {
        return node.prefix;
    }
        
     escapeXmlChars(str) {
        if(typeof(str) == "string")
            return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
        else
            return str;
    }

     unescapeXmlChars(str) {
        return str.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, '&');
    }
    
     checkInStdFiltersArrayForm(stdFiltersArrayForm, obj, name, path) {
        var idx = 0;
        for(; idx < stdFiltersArrayForm.length; idx++) {
            var filterPath = stdFiltersArrayForm[idx];
            if( typeof filterPath === "string" ) {
                if(filterPath == path)
                    break;
            }
            else
            if( filterPath instanceof RegExp) {
                if(filterPath.test(path))
                    break;
            }				
            else
            if( typeof filterPath === "function") {
                if(filterPath(obj, name, path))
                    break;
            }
        }
        return idx!=stdFiltersArrayForm.length;
    }
    
     toArrayAccessForm(obj, childName, path) {
        var config=this.config;
        switch(config.arrayAccessForm) {
            case "property":
                if(!(obj[childName] instanceof Array))
                    obj[childName+"_asArray"] = [obj[childName]];
                else
                    obj[childName+"_asArray"] = obj[childName];
                break;
            /*case "none":
                break;*/
        }
        
        if(!(obj[childName] instanceof Array) && config.arrayAccessFormPaths.length > 0) {
            if(this.checkInStdFiltersArrayForm(config.arrayAccessFormPaths, obj, childName, path)) {
                obj[childName] = [obj[childName]];
            }			
        }
    }
    
     fromXmlDateTime(prop) {
        // Implementation based up on http://stackoverflow.com/questions/8178598/xml-datetime-to-javascript-date-object
        // Improved to support full spec and optional parts
        var bits = prop.split(/[-T:+Z]/g);
        
        var d = new Date(bits[0], bits[1]-1, bits[2]);			
        var secondBits = bits[5].split("\.");
        d.setHours(bits[3], bits[4], secondBits[0]);
        if(secondBits.length>1)
            d.setMilliseconds(secondBits[1]);

        // Get supplied time zone offset in minutes
        if(bits[6] && bits[7]) {
            var offsetMinutes = bits[6] * 60 + Number(bits[7]);
            var sign = /\d\d-\d\d:\d\d$/.test(prop)? '-' : '+';

            // Apply the sign
            offsetMinutes = 0 + (sign == '-'? -1 * offsetMinutes : offsetMinutes);

            // Apply offset and local timezone
            d.setMinutes(d.getMinutes() - offsetMinutes - d.getTimezoneOffset())
        }
        else
            if(prop.indexOf("Z", prop.length - 1) !== -1) {
                d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds()));					
            }

        // d is now a local time equivalent to the supplied time
        return d;
    }
    
     checkFromXmlDateTimePaths(value, childName, fullPath) {
        var config=this.config;
        if(config.datetimeAccessFormPaths.length > 0) {
            var path = fullPath.split("\.#")[0];
            if(this.checkInStdFiltersArrayForm(config.datetimeAccessFormPaths, value, childName, path)) {
                return this.fromXmlDateTime(value);
            }
            else
                return value;			
        }
        else
            return value;
    }
    
     checkXmlElementsFilter(obj, childType, childName, childPath) {
        var config=this.config;
        if( childType == this.DOMNodeTypes.ELEMENT_NODE && config.xmlElementsFilter.length > 0) {
            return this.checkInStdFiltersArrayForm(config.xmlElementsFilter, obj, childName, childPath);	
        }
        else
            return true;
    }	

     parseDOMChildren( node, path ) {
        var config=this.config;
        var DOMNodeTypes=this.DOMNodeTypes;
        var result = null;
        if(node.nodeType == DOMNodeTypes.DOCUMENT_NODE) {
            result=new Object;
            var nodeChildren = node.childNodes;
            // Alternative for firstElementChild which is not supported in some environments
            for(var cidx=0; cidx <nodeChildren.length; cidx++) {
                var child = nodeChildren.item(cidx);
                if(child.nodeType == DOMNodeTypes.ELEMENT_NODE) {
                    var childName = this.getNodeLocalName(child);
                    result[childName] = this.parseDOMChildren(child, childName);
                }
            }
            return result;
        }
        else
        if(node.nodeType == DOMNodeTypes.ELEMENT_NODE) {
            result=new Object;
            result.__cnt=0;
            
            var nodeChildren = node.childNodes;
            
            // Children nodes
            for(var cidx=0; cidx <nodeChildren.length; cidx++) {
                var child = nodeChildren.item(cidx); // nodeChildren[cidx];
                var childName = this.getNodeLocalName(child);
                
                if(child.nodeType!= DOMNodeTypes.COMMENT_NODE) {
                    var childPath = path+"."+childName;
                    if (this.checkXmlElementsFilter(result,child.nodeType,childName,childPath)) {
                        result.__cnt++;
                        if(result[childName] == null) {
                            result[childName] = this.parseDOMChildren(child, childPath);
                            this.toArrayAccessForm(result, childName, childPath);					
                        }
                        else {
                            if(result[childName] != null) {
                                if( !(result[childName] instanceof Array)) {
                                    result[childName] = [result[childName]];
                                    this.toArrayAccessForm(result, childName, childPath);
                                }
                            }
                            (result[childName])[result[childName].length] = this.parseDOMChildren(child, childPath);
                        }
                    }
                }								
            }
            
            // Attributes
            for(var aidx=0; aidx <node.attributes.length; aidx++) {
                var attr = node.attributes.item(aidx); // [aidx];
                result.__cnt++;
                result[config.attributePrefix+attr.name]=attr.value;
            }
            
            // Node namespace prefix
            var nodePrefix = this.getNodePrefix(node);
            if(nodePrefix!=null && nodePrefix!="") {
                result.__cnt++;
                result.__prefix=nodePrefix;
            }
            
            if(result["#text"]!=null) {				
                result.__text = result["#text"];
                if(result.__text instanceof Array) {
                    result.__text = result.__text.join("\n");
                }
                //if(config.escapeMode)
                //	result.__text = unescapeXmlChars(result.__text);
                if(config.stripWhitespaces)
                    result.__text = result.__text.trim();
                delete result["#text"];
                if(config.arrayAccessForm=="property")
                    delete result["#text_asArray"];
                result.__text = this.checkFromXmlDateTimePaths(result.__text, childName, path+"."+childName);
            }
            if(result["#cdata-section"]!=null) {
                result.__cdata = result["#cdata-section"];
                delete result["#cdata-section"];
                if(config.arrayAccessForm=="property")
                    delete result["#cdata-section_asArray"];
            }
            
            if( result.__cnt == 0 && config.emptyNodeForm=="text" ) {
                result = '';
            }
            else
            if( result.__cnt == 1 && result.__text!=null  ) {
                result = result.__text;
            }
            else
            if( result.__cnt == 1 && result.__cdata!=null && !config.keepCData  ) {
                result = result.__cdata;
            }			
            else			
            if ( result.__cnt > 1 && result.__text!=null && config.skipEmptyTextNodesForObj) {
                if( (config.stripWhitespaces && result.__text=="") || (result.__text.trim()=="")) {
                    delete result.__text;
                }
            }
            delete result.__cnt;			
            
            if( config.enableToStringFunc && (result.__text!=null || result.__cdata!=null )) {
                result.toString = function() {
                    return (this.__text!=null? this.__text:'')+( this.__cdata!=null ? this.__cdata:'');
                };
            }
            
            return result;
        }
        else
        if(node.nodeType == DOMNodeTypes.TEXT_NODE || node.nodeType == DOMNodeTypes.CDATA_SECTION_NODE) {
            return node.nodeValue;
        }	
    }
    
     startTag(jsonObj, element, attrList, closed) {
        var config=this.config;
        var DOMNodeTypes=this.DOMNodeTypes;
        var resultStr = "<"+ ( (jsonObj!=null && jsonObj.__prefix!=null)? (jsonObj.__prefix+":"):"") + element;
        if(attrList!=null) {
            for(var aidx = 0; aidx < attrList.length; aidx++) {
                var attrName = attrList[aidx];
                var attrVal = jsonObj[attrName];
                if(config.escapeMode)
                    attrVal=this.escapeXmlChars(attrVal);
                resultStr+=" "+attrName.substr(config.attributePrefix.length)+"=";
                if(config.useDoubleQuotes)
                    resultStr+='"'+attrVal+'"';
                else
                    resultStr+="'"+attrVal+"'";
            }
        }
        if(!closed)
            resultStr+=">";
        else
            resultStr+="/>";
        return resultStr;
    }

     endTag(jsonObj,elementName) {
        return "</"+ (jsonObj.__prefix!=null? (jsonObj.__prefix+":"):"")+elementName+">";
    }
    
     endsWith(str, suffix) {
        return str.indexOf(suffix, str.length - suffix.length) !== -1;
    }
    
     jsonXmlSpecialElem ( jsonObj, jsonObjField ) {
        var config=this.config;
        var DOMNodeTypes=this.DOMNodeTypes;
        if((config.arrayAccessForm=="property" && this.endsWith(jsonObjField.toString(),("_asArray"))) 
                || jsonObjField.toString().indexOf(config.attributePrefix)==0 
                || jsonObjField.toString().indexOf("__")==0
                || (jsonObj[jsonObjField] instanceof Function) )
            return true;
        else
            return false;
    }
    
     jsonXmlElemCount ( jsonObj ) {
        var elementsCnt = 0;
        if(jsonObj instanceof Object ) {
            for( var it in jsonObj  ) {
                if(this.jsonXmlSpecialElem ( jsonObj, it) )
                    continue;			
                elementsCnt++;
            }
        }
        return elementsCnt;
    }
    
     checkJsonObjPropertiesFilter(jsonObj, propertyName, jsonObjPath) {
        var config=this.config;
        var DOMNodeTypes=this.DOMNodeTypes;
        return config.jsonPropertiesFilter.length == 0
            || jsonObjPath==""
            || this.checkInStdFiltersArrayForm(config.jsonPropertiesFilter, jsonObj, propertyName, jsonObjPath);	
    }
    
     parseJSONAttributes ( jsonObj ) {
        var config=this.config;
        var DOMNodeTypes=this.DOMNodeTypes;
        var attrList = [];
        if(jsonObj instanceof Object ) {
            for( var ait in jsonObj  ) {
                if(ait.toString().indexOf("__")== -1 && ait.toString().indexOf(config.attributePrefix)==0) {
                    attrList.push(ait);
                }
            }
        }
        return attrList;
    }
    
     parseJSONTextAttrs ( jsonTxtObj ) {
        var config=this.config;
        var DOMNodeTypes=this.DOMNodeTypes;
        var result ="";
        
        if(jsonTxtObj.__cdata!=null) {										
            result+="<![CDATA["+jsonTxtObj.__cdata+"]]>";					
        }
        
        if(jsonTxtObj.__text!=null) {			
            if(config.escapeMode)
                result+=this.escapeXmlChars(jsonTxtObj.__text);
            else
                result+=jsonTxtObj.__text;
        }
        return result;
    }
    
     parseJSONTextObject ( jsonTxtObj ) {
        var config=this.config;
        var DOMNodeTypes=this.DOMNodeTypes;
        var result ="";

        if( jsonTxtObj instanceof Object ) {
            result+=this.parseJSONTextAttrs ( jsonTxtObj );
        }
        else
            if(jsonTxtObj!=null) {
                if(config.escapeMode)
                    result+=this.escapeXmlChars(jsonTxtObj);
                else
                    result+=jsonTxtObj;
            }
        
        return result;
    }
    
     getJsonPropertyPath(jsonObjPath, jsonPropName) {
        if (jsonObjPath==="") {
            return jsonPropName;
        }
        else
            return jsonObjPath+"."+jsonPropName;
    }
    
     parseJSONArray ( jsonArrRoot, jsonArrObj, attrList, jsonObjPath ) {
        var result = ""; 
        if(jsonArrRoot.length == 0) {
            result+=this.startTag(jsonArrRoot, jsonArrObj, attrList, true);
        }
        else {
            for(var arIdx = 0; arIdx < jsonArrRoot.length; arIdx++) {
                result+=this.startTag(jsonArrRoot[arIdx], jsonArrObj, this.parseJSONAttributes(jsonArrRoot[arIdx]), false);
                result+=this.parseJSONObject(jsonArrRoot[arIdx], this.getJsonPropertyPath(jsonObjPath,jsonArrObj));
                result+=this.endTag(jsonArrRoot[arIdx],jsonArrObj);
            }
        }
        return result;
    }
    
     parseJSONObject ( jsonObj, jsonObjPath ) {
        var result = "";	

        var elementsCnt = this.jsonXmlElemCount ( jsonObj );
        
        if(elementsCnt > 0) {
            for( var it in jsonObj ) {
                
                if(this.jsonXmlSpecialElem ( jsonObj, it) || (jsonObjPath!="" && !this.checkJsonObjPropertiesFilter(jsonObj, it, this.getJsonPropertyPath(jsonObjPath,it))) )
                    continue;			
                
                var subObj = jsonObj[it];						
                
                var attrList = this.parseJSONAttributes( subObj )
                
                if(subObj == null || subObj == undefined) {
                    result+=this.startTag(subObj, it, attrList, true);
                }
                else
                if(subObj instanceof Object) {
                    
                    if(subObj instanceof Array) {					
                        result+=this.parseJSONArray( subObj, it, attrList, jsonObjPath );					
                    }
                    else if(subObj instanceof Date) {
                        result+=this.startTag(subObj, it, attrList, false);
                        result+=subObj.toISOString();
                        result+=this.endTag(subObj,it);
                    }
                    else {
                        var subObjElementsCnt = this.jsonXmlElemCount ( subObj );
                        if(subObjElementsCnt > 0 || subObj.__text!=null || subObj.__cdata!=null) {
                            result+=this.startTag(subObj, it, attrList, false);
                            result+=this.parseJSONObject(subObj, this.getJsonPropertyPath(jsonObjPath,it));
                            result+=this.endTag(subObj,it);
                        }
                        else {
                            result+=this.startTag(subObj, it, attrList, true);
                        }
                    }
                }
                else {
                    result+=this.startTag(subObj, it, attrList, false);
                    result+=this.parseJSONTextObject(subObj);
                    result+=this.endTag(subObj,it);
                }
            }
        }
        result+=this.parseJSONTextObject(jsonObj);
        
        return result;
    }
    
    parseXmlString (xmlDocStr) {
        if (xmlDocStr === undefined) {
            return null;
        }
        var xmlDoc;
            var parser=new DOMParser();			
            var parsererrorNS = null;
            
                xmlDoc = parser.parseFromString( xmlDocStr, "text/xml" );
                if( parsererrorNS!= null && xmlDoc.getElementsByTagNameNS(parsererrorNS, "parsererror").length > 0) {
                    //throw new Error('Error parsing XML: '+xmlDocStr);
                    xmlDoc = null;
                }
       
        return xmlDoc;
    }
    
    asArray(prop) {
        if (prop === undefined || prop == null)
            return [];
        else
        if(prop instanceof Array)
            return prop;
        else
            return [prop];
    }
    
    toXmlDateTime(dt) {
        if(dt instanceof Date)
            return dt.toISOString();
        else
        if(typeof(dt) === 'number' )
            return new Date(dt).toISOString();
        else	
            return null;
    }
    
    asDateTime(prop) {
        if(typeof(prop) == "string") {
            return this.fromXmlDateTime(prop);
        }
        else
            return prop;
    }

    xml2json(xmlDoc) {
        return this.parseDOMChildren( xmlDoc,'/' );
    }
    
    xml_str2json(xmlDocStr) {
        var xmlDoc = this.parseXmlString(xmlDocStr);
        if(xmlDoc!=null)
            return this.xml2json(xmlDoc);
        else
            return null;
    }

    json2xml_str(jsonObj) {
        return this.parseJSONObject ( jsonObj, "" );
    }

    json2xml(jsonObj) {
        var xmlDocStr = this.json2xml_str (jsonObj);
        return this.parseXmlString(xmlDocStr);
    }
    
    getVersion(){
        return this.VERSION;
    }
}