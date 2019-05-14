import { SQLite } from '@ionic-native/sqlite/ngx';
import { HTTP } from '@ionic-native/http/ngx';

export class DBMgr {
    private _db: any;
    private win: any = window;
    
    type = 0;


    Init(http: HTTP, sqlite: SQLite) {

        var dbcreateUSERsql = "CREATE TABLE  IF NOT EXISTS  USER (ID INTEGER PRIMARY KEY AUTOINCREMENT,`number` nvarchar(25),`password` nvarchar(100),`sdate` int(15));";

        let createActivityTableSQL = "CREATE TABLE IF NOT EXISTS tb_Activity (LocalID integer primary key autoincrement not null,ActivityID int, caseId int, fileNum int, activityDate text, activityStartTime text, activityEndTime text, presentVolunteer text,  actType int, activityDetailType text, remarks1 text, remarks2 text, remarks3 text, remarks4 text, otherActRemarks text, otherContent text, uploadStatus int, save int, supportId int)";

        let createPhoneTableSQL = "CREATE TABLE IF NOT EXISTS tb_Phone (LocalId integer primary key autoincrement not null, SupportId int,CaseId int, CallDate nvarchar(10), CallStartTime nvarchar(10), CallEndTime nvarchar(10),nextVisitDateandTime nvarchar(10), Detail nvarchar(50) ,DetailOther nvarchar(100), UserName nvarchar(100), OtherRemark nvarchar(500), Status int, SavedStatus int DEFAULT '0')";

        let createHosiptal = "CREATE TABLE IF NOT EXISTS tb_Hosiptal (id int, name text)";

        let createSpecality = "CREATE TABLE IF NOT EXISTS tb_Speciality (id int, Speciality text)";

        let CaseSql = "CREATE TABLE IF NOT EXISTS tb_Case (id integer primary key autoincrement not null,CaseNo nvarchar(50), VolVisitGrpId int,QRCode text, ChiName_Disply nvarchar(50),Illness_Disply nvarchar(1000), OtherIllness_Disply nvarchar(1000), CarePlan_Disply nvarchar(1000),Height double)";

        let createVisittableSQL = "CREATE TABLE IF NOT EXISTS tb_home_visit (LocalId integer primary key autoincrement not null,CaseId int,TaskId int,VisitId int,ScheduleDate nvarchar(10),ScheduleTime nvarchar(10),VisitDate nvarchar(10),VisitStartTime nvarchar(10),VisitEndTime nvarchar(10),presentVolunteer nvarchar(100),supportVolunteer nvarchar(100),Location int,LocationRemarks nvarchar(100),VisitStatus int,VisitStatusRemarks nvarchar(100),VisitDetailIndoor nvarchar(50),VisitDetailIndoorRemarks nvarchar(100),VisitDetailOutdoor nvarchar(50),VisitDetailOutdoorRemarks nvarchar(100),VisitDetailOther nvarchar(500),CategoryTopic1 nvarchar(500),CategoryTopic2 nvarchar(500),CategoryTopic3 nvarchar(500),Weight Double,Bmi Double,Waist Double,Hip Double,WHRatio Double,SYS1 Double,DlA1 Double,SYS2 Double,DlA2 Double,heartBeats1 Double,heartBeats2 Double,LifeStyleQuestion1 int,LifeStyleQuestion2 int,LifeStyleQuestion3 int,LifeStyleQuestion4 int,LifeStyleQuestion5 int,LifeStyleQuestion6 int,LifeStyleMeasureBloodSuger int,LifeStyleMeasureBsLocation int,LifeStyleMeasureBsPeriod int,LifeStyleMeasureBsNoOfTime int,LifeStyleMeasureBloodPressure int,LifeStyleMeasureBpLocation int,LifeStyleMeasureBpPeriod int,LifeStyleMeasureBpNoOfTime int,EmotionAssessment nvarchar(50),EmotionAssessmentRemarks nvarchar(100),OtherHospDisbete int,OtherHospDisbeteNoOfDay int,OtherHospHighBp int,OtherHospHighBpNoOfDay int,OtherHospOtherIllness int,OtherAccident int,OtherHospOtherIllnessNoOfDay int,OtherSpecialNeed int,OtherAccidentNoOfDay int,OtherSpecialNeedService nvarchar(100),OtherRemarks nvarchar(500),DeletePicString nvarchar(100),Status int,SavedStatus int DEFAULT '0');";

        let CreateImgSQL = "CREATE TABLE IF NOT EXISTS tb_Image (imageId int, imagePath text, visitId int, imageName text, entensionName text, caseId int, locationId int)";

        let recordSQL = "CREATE TABLE IF NOT EXISTS tb_Record (appointmentId int, medId integer primary key autoincrement not null, caseId int, medicalLocation int, kinds int, medicalStatus int, content text,  medicalDate text, medicalStatusRemark text, save int, medicalTime text, canDelete int)";

        let HeartRateSQL = "CREATE TABLE IF NOT EXISTS tb_HeartRate (HeartRateId int, RecordId int, CaseId int, RecordType int, MeasurementDate text,  RatePerMin double)";

        let createClientSQL = "CREATE TABLE IF NOT EXISTS tb_Client (fileNum int, diseases text, diseasesPeriod text, otherDiseases text, caseString text, qrCodeString text, ChiName text, Illness text, OtherIllness text, grpId int, plan text, height double)";

        let BloodPressureSQL = "CREATE TABLE IF NOT EXISTS tb_BloodPressure (BloodPressureId int, recordId int, CaseId int, RecordType int, MeasurementDate text, Upper double, Lower double)";

        let WeightSQL = "CREATE TABLE IF NOT EXISTS tb_Weight (Weight double, CaseId int, MeasurementDate text)";

        let WHRSQL = "CREATE TABLE IF NOT EXISTS tb_WHR (Ratio double, CaseId int, MeasurementDate text)";

        let createVolunteerSQL = "CREATE TABLE IF NOT EXISTS tb_Volunteer (id integer primary key autoincrement not null, caseid int, voltype int, groupid int, selfid int, name text)";


        let AccessmentSQL = "CREATE TABLE IF NOT EXISTS tb_Assessment (Status int, CarePlan_Disply text, CaseId int)";
        let IntakePartSQL = "CREATE TABLE IF NOT EXISTS tb_IntakePart (CaseId int, CarePlan_Disply text)";
        let AppointmentDateSQL = "CREATE TABLE IF NOT EXISTS tb_AppointmentDate (CaseId int, TaskId int, ScheduleDate text)";

        let MedicalRecordSQL = "CREATE TABLE IF NOT EXISTS tb_MedicalRecord (LocalId integer primary key autoincrement not null, AppointmentId int, CaseId int, AppointmentDate nvarchar(10), AppointmentTime nvarchar(10),Hosp int,Specialty int,Description nvarchar(500),Status int, Reason nvarchar(100),SavedStatus int)";



        if (this.win.sqlitePlugin) {
            //alert(1);
            this.type = 0;
            sqlite.create({
                name: 'appdata8.db',
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
                this.execSql(MedicalRecordSQL);
            });
        } else {
            this.type = 1;
            //alert(2);
            this._db = this.win.openDatabase("appdata8.db", '1.0', 'database', 5 * 1024 * 1024);
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
            this.execSql(MedicalRecordSQL);
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