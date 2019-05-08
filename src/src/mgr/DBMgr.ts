import { SQLite } from '@ionic-native/sqlite/ngx';
import { HTTP } from '@ionic-native/http/ngx';

export class DBMgr {
    private _db: any;
    private win: any = window;
    
    type = 0;


    Init(http: HTTP, sqlite: SQLite) {

        var dbcreateUSERsql = "CREATE TABLE  IF NOT EXISTS  USER (ID INTEGER PRIMARY KEY AUTOINCREMENT,`number` nvarchar(25),`password` nvarchar(100),`sdate` int(15));";

        let createActivityTableSQL = "CREATE TABLE IF NOT EXISTS tb_Activity (LocalID integer primary key autoincrement not null,ActivityID int, caseId int, fileNum int, activityDate text, activityStartTime text, activityEndTime text, presentVolunteer text,  actType int, activityDetailType text, remarks1 text, remarks2 text, remarks3 text, remarks4 text, otherActRemarks text, otherContent text, uploadStatus int, save int, supportId int)";

        let createPhoneTableSQL = "CREATE TABLE IF NOT EXISTS tb_Phone (PhoneID integer primary key autoincrement not null, fileNum int, phoneDate text, phoneStartTime text, phoneEndTime text ,nextVisitDateandTime text, phoneContent text ,otherPhoneContent text, otherContent text, uploadStatus int, save int, createdPerson text, supportId int)";

        let createHosiptal = "CREATE TABLE IF NOT EXISTS tb_Hosiptal (id int, name text)";

        let createSpecality = "CREATE TABLE IF NOT EXISTS tb_Speciality (id int, Speciality text)";

        let CaseSql = "CREATE TABLE IF NOT EXISTS tb_Case (id integer primary key autoincrement not null,CaseNo nvarchar(50), VolVisitGrpId int,QRCode text, ChiName_Disply nvarchar(50),Illness_Disply nvarchar(1000), OtherIllness_Disply nvarchar(1000), CarePlan_Disply nvarchar(1000),Height double)";

        let createVisittableSQL = " CREATE TABLE IF NOT EXISTS tb_Visit (locationId integer primary key autoincrement not null,fileNum int,taskID int,visitId int,appointmentDate text  ,appointmentTime text  ,actualVisitDate text ,actualVisitStartTime text ,actualVisitEndTime text , visitLocation int, locationRemarks text, visitStatus int, visitStatusRemarks text, indoorActivityContent text, indoorActivityContentRemarks text, outdoorActivityContent text, outdoorActivityContentRemarks text, otherActivityContent text, sharedLeaflet1 text, sharedLeaflet2 text, sharedLeaflet3 text, presentVolunteer text, SYS1 double, DlA1 double, heartBeats1 double, SYS2 double, DlA2 double, heartBeats2 double, SYS3 double, DlA3 double, heartBeats3 double, height double, weight double, BMI double, waistline double, hipCircumference double, waistHipRatio double, isObtainDrug int, isLowSodium int, isLowFat int, isHighDietaryFibre int, isExercise int, isHomeSafe int, isMeasureBloodSugar int, LifeStyleMeasureBsLocation int, LifeStyleMeasureBsPeriod int, LifeStyleMeasureBsNoOfTime double, isMeasureBloodPressure int, LifeStyleMeasureBpLocation int, LifeStyleMeasureBpPeriod int, LifeStyleMeasureBpNoOfTime double, emotionEstamine text, EmotionAssessmentRemarks text, otherHospDisbete int, otherHospDisbeteNoofDay int, otherHospHighBloodPressure int, otherHospHighBloodPressureNumofDay int,otherHospOtherDisease int, otherHospOtherDiseaseNoofDay int,isAccidentBefore int,isAccidentBeforeNumofTime int,isAnyNeeds int,NeedsContent text,otherContent text,uploadStatus int,save int,supportVolunteer text,DeletePicString text);";

        let CreateImgSQL = "CREATE TABLE IF NOT EXISTS tb_Image (imageId int, imagePath text, visitId int, imageName text, entensionName text, caseId int, locationId int)";

        let recordSQL = "CREATE TABLE IF NOT EXISTS tb_Record (appointmentId int, medId integer primary key autoincrement not null, caseId int, medicalLocation int, kinds int, medicalStatus int, content text,  medicalDate text, medicalStatusRemark text, save int, medicalTime text, canDelete int)";

        let HeartRateSQL = "CREATE TABLE IF NOT EXISTS tb_HeartRate (HeartRateId int, RecordId int, CaseId int, RecordType int, MeasurementDate text,  RatePerMin double)";

        let createClientSQL = "CREATE TABLE IF NOT EXISTS tb_Client (fileNum int, diseases text, diseasesPeriod text, otherDiseases text, caseString text, qrCodeString text, ChiName text, Illness text, OtherIllness text, grpId int, plan text, height double)";

        let BloodPressureSQL = "CREATE TABLE IF NOT EXISTS tb_BloodPressure (BloodPressureId int, recordId int, CaseId int, RecordType int, MeasurementDate text, Upper double, Lower double)";

        let WeightSQL = "CREATE TABLE IF NOT EXISTS tb_Weight (Weight double, CaseId int, MeasurementDate text)";

        let WHRSQL = "CREATE TABLE IF NOT EXISTS tb_WHR (Ratio double, CaseId int, MeasurementDate text)";

        let createVolunteerSQL = "CREATE TABLE IF NOT EXISTS tb_Volunteer (caseid int, voltype int, groupid int, selfid int, name text)";


        let AccessmentSQL = "CREATE TABLE IF NOT EXISTS tb_Assessment (Status int, CarePlan_Disply text, CaseId int)";
        let IntakePartSQL = "CREATE TABLE IF NOT EXISTS tb_IntakePart (CaseId int, CarePlan_Disply text)";
        let AppointmentDateSQL = "CREATE TABLE IF NOT EXISTS tb_AppointmentDate (CaseId int, TaskId int, ScheduleDate text)";



        if (this.win.sqlitePlugin) {
            //alert(1);
            this.type = 0;
            sqlite.create({
                name: 'appdata4.db',
                location: 'default'
            }).then((db) => {
                this._db = db;
                this.execSql(dbcreateUSERsql);
                this.execSql(createActivityTableSQL);
                this.execSql(createPhoneTableSQL);
                this.execSql(createHosiptal);
                this.execSql(createSpecality);
                this.execSql(createVisittableSQL);
                this.execSql(CreateImgSQL);
                this.execSql(recordSQL);
                this.execSql(HeartRateSQL);
                this.execSql(createClientSQL);
                this.execSql(BloodPressureSQL);
                this.execSql(WeightSQL);
                this.execSql(WHRSQL);
                this.execSql(createVolunteerSQL);
                this.execSql(AccessmentSQL);
                this.execSql(IntakePartSQL);
                this.execSql(AppointmentDateSQL); 
                this.execSql(CaseSql);
            });
        } else {
            this.type = 1;
            //alert(2);
            this._db = this.win.openDatabase("appdata4.db", '1.0', 'database', 5 * 1024 * 1024);
            this.execSql(dbcreateUSERsql);
            this.execSql(createActivityTableSQL);
            this.execSql(createPhoneTableSQL);
            this.execSql(createHosiptal);
            this.execSql(createSpecality);
            this.execSql(createVisittableSQL);
            this.execSql(CreateImgSQL);
            this.execSql(recordSQL);
            this.execSql(HeartRateSQL);
            this.execSql(createClientSQL);
            this.execSql(BloodPressureSQL);
            this.execSql(WeightSQL);
            this.execSql(WHRSQL);
            this.execSql(createVolunteerSQL);
            this.execSql(AccessmentSQL);
            this.execSql(IntakePartSQL);
            this.execSql(AppointmentDateSQL);
            this.execSql(CaseSql);
        }

    }

    private constructor() {

    }
    private static Instance: DBMgr = null; //单例模式
    public static GetInstance() {
        if (DBMgr.Instance == null) {
            DBMgr.Instance = new DBMgr();
        }
        return DBMgr.Instance;
    }

    execSql(sql: string, params = []): Promise<any> {

        console.log({ sql, params });

        return new Promise((resolve, reject) => {
            try {
                //alert(this._db);
                this._db.transaction((tx) => {
                    //alert(3);
                    tx.executeSql(sql, params,
                        (tx, res) => {
                            if (this.type == 0) {
                                var rows = [];
                                for (var i = 0; i < res.rows.length; i++) {
                                    try {
                                        var c = [];
                                        var item = res.rows.item(i);
                                        rows.push(item);
                                    }
                                    catch (e) {
                                        //alert(e);
                                    }
                                }
                                //alert(JSON.stringify(rows));
                                res.rows = rows;
                            }
                            resolve({ tx: tx, res: res })
                        },
                        (tx, err) => { console.log(err); reject({ tx: tx, err: err }) });
                },
                    (err) => { console.log(err); reject({ err: err }) });
            } catch (err) {
                console.log(err);
                //alert(err);

                reject({ err: err });
            }
        });
    }

}