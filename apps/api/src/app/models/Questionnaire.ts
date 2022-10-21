import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';
import { User } from './User';

export interface CreateQuestionnaire {
  user_id: number;
  question_title: string;
  response: string;
  type: string;
}

export interface QuestionnaireDefinedAttributes {
  id: number;
  user_id: number;
  question_title: string;
  response: string;
  type: string;
}

export interface QuestionnaireModel extends Model<QuestionnaireModel, QuestionnaireDefinedAttributes> {
  id: number;
  user_id: number;
  question_title: string;
  response: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}

export const Questionnaire = sequelize.define<QuestionnaireModel, QuestionnaireDefinedAttributes>('questionnaire', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Users', key: 'id' } },
  question_title: { type: DataTypes.STRING, allowNull: false },
  response: { type: DataTypes.STRING(1000), allowNull: false },
  type: { type: DataTypes.STRING, allowNull: false },
});

Questionnaire.sync();

// Associations
Questionnaire.afterSync(() => {
  Questionnaire.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id' });
});
