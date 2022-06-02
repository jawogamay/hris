import { DateTime } from 'luxon'
import User from 'App/Models/User'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'

export default class UserDetail extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number
  
  @belongsTo(()=> User)
  public user: BelongsTo<typeof User>

  @column()
  public username: string

  @column()
  public mfpHelp: boolean

  @column()
  public weightGoalLevel: string

  @column()
  public activityLevel: number

  @column()
  public address: string

  @column()
  public zipCode: string

  @column()
  public height: number

  @column()
  public currentWeight: number

  @column()
  public goalWeight: number

  @column()
  public nineToTenMode: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
