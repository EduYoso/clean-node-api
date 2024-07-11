import { AccountModel } from "../../../domain/models/account";
import {
  AddAccount,
  AddAccountModel,
} from "../../../domain/usecases/add-account";
import { Encrypter } from "../../protocols/encrypter";

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter;
  constructor(encrypter: Encrypter) {
    this.encrypter = encrypter;
  }
  async add(account: AddAccountModel): Promise<AccountModel> {
    const { name, email, password } = account;

    const encryptedPassword = await this.encrypter.encrypt(password);
    const accountModel = {
      id: "any_id",
      name,
      email,
      password: encryptedPassword,
    };

    return accountModel;
  }
}
