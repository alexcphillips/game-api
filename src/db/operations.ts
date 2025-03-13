import { mongo } from ".";

export type InsertOneResult = {
  acknowledged: boolean;
  insertedId: string;
};

export const createCollections = async (
  collections: string[] = [],
): Promise<void> => {
  try {
    const existingCollections = await mongo.db.listCollections().toArray();
    const existingNames = existingCollections.map((e) => e.name);
    const missingCollections = collections.filter(
      (name) => !existingNames.includes(name),
    );
    await Promise.all(
      missingCollections.map((mc) => mongo.db.createCollection(mc)),
    );
  } catch (err) {
    console.error("operations err:", err);
  } finally {
    console.log("finished creating collections");
  }
};

export const createIndex = async (collection: string, index: object) => {
  return mongo.db.collection(collection).createIndex(index);
};

export const findOneAndDelete = async (collection, filter) => {
  return mongo.db.collection(collection).findOneAndDelete(filter);
};

export const deleteOne = async (collection, filter) => {
  return mongo.db.collection(collection).deleteOne(filter);
};

export const deleteMany = async (collection, filter) => {
  return mongo.db.collection(collection).deleteMany(filter);
};

export const findOne = async (collection, query = {}, project = {}) => {
  return mongo.db.collection(collection).findOne(query, project);
};

export const find = async (collection: string, query = {}, projection = {}) => {
  const opts = { projection };
  return mongo.db.collection(collection).find(query, opts).toArray();
};

export const insertOne = async (collection, doc): Promise<InsertOneResult> => {
  return mongo.db.collection(collection).insertOne(doc);
};

export const insertMany = async (coll: string, docs) => {
  if (!docs || !docs.length) {
    return;
  }
  return mongo.db
    .collection(coll)
    .insertMany(Array.isArray(docs) ? docs : [docs]);
};

export const updateMany = async (collection, filter, update) => {
  return await mongo.db
    .collection(collection)
    .updateMany(filter, { $set: update });
};
export const updateOne = async (collection, filter, update) => {
  return mongo.db.collection(collection).updateOne(filter, { $set: update });
};

export const findOneAndUpdate = async (collection, filter, update) => {
  return mongo.db
    .collection(collection)
    .findOneAndUpdate(filter, { $set: update });
};

export const addToArray = async (collection, filter, update) => {
  return mongo.db.collection(collection).updateOne(filter, { $push: update });
};

export const updateArrayByField = async (collection, filter, updates) => {
  return mongo.db.collection(collection).findOneAndUpdate(filter, {
    $set: updates,
  });
};

export const removeFromArray = async (collection, filter, update) => {
  return mongo.db.collection(collection).updateOne(filter, {
    $pull: update,
  });
};
